import multer from 'multer';
import path from 'path';
import { config } from '../config';
import { FileUploadError } from '../utils/errors';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), config.upload.uploadDir));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'] as const;
  if (allowedTypes.includes(file.mimetype as any)) {
    cb(null, true);
  } else {
    cb(new FileUploadError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
  }
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.upload.maxFileSize,
  }
});

// Error handling wrapper
export const handleUpload = (fieldName: string) => {
  return (req: any, res: any, next: any) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          next(new FileUploadError(`File size too large. Maximum size is ${config.upload.maxFileSize / 1024 / 1024}MB`));
        } else {
          next(new FileUploadError(err.message));
        }
      } else if (err) {
        next(err);
      } else {
        next();
      }
    });
  };
};

// Multiple file upload handler
export const handleMultipleUpload = (fieldName: string, maxCount: number = 5) => {
  return (req: any, res: any, next: any) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          next(new FileUploadError(`File size too large. Maximum size is ${config.upload.maxFileSize / 1024 / 1024}MB`));
        } else if (err.code === 'LIMIT_FILE_COUNT') {
          next(new FileUploadError(`Too many files. Maximum count is ${maxCount}`));
        } else {
          next(new FileUploadError(err.message));
        }
      } else if (err) {
        next(err);
      } else {
        next();
      }
    });
  };
}; 