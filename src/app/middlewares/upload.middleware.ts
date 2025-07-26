import multer from 'multer';

const storage = multer.memoryStorage(); // файл хранится в оперативке

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log('📥 multer received file:', file.originalname);
    cb(null, true);
  },
});
