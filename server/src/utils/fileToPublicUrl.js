function fileToPublicUrl(req, file) {
  if (!file) return null;
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
}

module.exports = fileToPublicUrl;
