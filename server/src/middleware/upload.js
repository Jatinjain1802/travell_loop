const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = require('../config/env');

const uploadPath = path.resolve(process.cwd(), env.uploadDir);
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    const safe = `${Date.now()}-${file.originalname}`.replace(/\s+/g, '-');
    cb(null, safe);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: env.maxUploadSizeMb * 1024 * 1024 }
});

module.exports = upload;
