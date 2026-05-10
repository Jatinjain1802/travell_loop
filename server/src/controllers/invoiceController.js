const { z } = require('zod');
const { StatusCodes } = require('http-status-codes');
const { Invoice, InvoiceItem, Trip, User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const assertTripOwnership = require('../utils/assertTripOwnership');
const generateInvoiceNumber = require('../utils/generateInvoiceNumber');
const generateInvoicePdfBuffer = require('../utils/generateInvoicePdfBuffer');
const sendEmail = require('../utils/sendEmail');

const itemSchema = z.object({ category: z.string().min(1), description: z.string().min(1), quantity: z.number().int().positive(), unitCost: z.number().nonnegative() });

const generateInvoice = asyncHandler(async (req, res) => {
  const payload = z.object({ tripId: z.number().int().positive(), items: z.array(itemSchema).min(1), tax: z.number().nonnegative().optional().default(0), discount: z.number().nonnegative().optional().default(0), emailTo: z.string().email().optional() }).parse(req.body);
  await assertTripOwnership(payload.tripId, req.user.id);

  const subtotal = payload.items.reduce((sum, it) => sum + (it.quantity * it.unitCost), 0);
  const grandTotal = subtotal + payload.tax - payload.discount;

  const invoice = await Invoice.create({ tripId: payload.tripId, invoiceNumber: generateInvoiceNumber(), subtotal, tax: payload.tax, discount: payload.discount, grandTotal });
  await InvoiceItem.bulkCreate(payload.items.map((it) => ({ ...it, amount: it.quantity * it.unitCost, invoiceId: invoice.id })));

  const full = await Invoice.findByPk(invoice.id, { include: [{ model: InvoiceItem, as: 'items' }, { model: Trip, as: 'trip', include: [{ model: User, as: 'user' }] }] });

  if (payload.emailTo) {
    const buffer = await generateInvoicePdfBuffer(full.toJSON());
    await sendEmail({
      to: payload.emailTo,
      subject: `Traveloop Invoice ${full.invoiceNumber}`,
      text: 'Please find your invoice attached.',
      attachments: [{ filename: `${full.invoiceNumber}.pdf`, content: buffer }]
    });
  }

  res.status(StatusCodes.CREATED).json({ invoice: full });
});

const getTripInvoice = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const invoice = await Invoice.findOne({ where: { tripId: Number(req.params.id) }, include: [{ model: InvoiceItem, as: 'items' }] });
  if (!invoice) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invoice not found' });
  res.status(StatusCodes.OK).json({ invoice });
});

const markPaid = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByPk(Number(req.params.id), { include: [{ model: Trip, as: 'trip' }] });
  if (!invoice) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invoice not found' });
  if (invoice.trip.userId !== req.user.id && req.user.role !== 'admin') return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  await invoice.update({ paymentStatus: 'paid' });
  res.status(StatusCodes.OK).json({ invoice });
});

const invoicePdf = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByPk(Number(req.params.id), { include: [{ model: Trip, as: 'trip' }, { model: InvoiceItem, as: 'items' }] });
  if (!invoice) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invoice not found' });
  if (invoice.trip.userId !== req.user.id && req.user.role !== 'admin') return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });

  const buffer = await generateInvoicePdfBuffer(invoice.toJSON());
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${invoice.invoiceNumber}.pdf"`);
  return res.status(StatusCodes.OK).send(buffer);
});

module.exports = { generateInvoice, getTripInvoice, markPaid, invoicePdf };
