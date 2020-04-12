import multer from 'multer';
import crypto from 'crypto';
import { extension } from 'mime-types';
import path from 'path';
import fs from 'fs';

const uploadsPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

const storageConfig = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsPath);
  },
  filename(req, file, cb) {
    const rnd = crypto.randomBytes(2).toString('hex');
    const ext = extension(file.mimetype);
    cb(null, `${Date.now()}-${rnd}.${ext}`);
  },
});

export const upload = multer({
  storage: storageConfig,
});
