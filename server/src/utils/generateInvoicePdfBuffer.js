const PDFDocument = require('pdfkit');

function generateInvoicePdfBuffer(invoice) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(20).text('Traveloop Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Status: ${invoice.paymentStatus}`);
    doc.text(`Generated At: ${new Date(invoice.generatedAt).toISOString()}`);
    doc.moveDown();

    doc.text('Items:', { underline: true });
    invoice.items.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.category} | ${item.description} | Qty: ${item.quantity} | Unit: ${item.unitCost} | Amount: ${item.amount}`);
    });

    doc.moveDown();
    doc.text(`Subtotal: ${invoice.subtotal}`);
    doc.text(`Tax: ${invoice.tax}`);
    doc.text(`Discount: ${invoice.discount}`);
    doc.font('Helvetica-Bold').text(`Grand Total: ${invoice.grandTotal}`);

    doc.end();
  });
}

module.exports = generateInvoicePdfBuffer;
