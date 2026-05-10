function generateInvoiceNumber() {
  const now = Date.now().toString().slice(-6);
  return `INV-${now}-${Math.floor(Math.random() * 10000)}`;
}

module.exports = generateInvoiceNumber;
