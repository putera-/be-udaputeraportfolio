import multer from 'multer';
import fileService from '../service/file-service.js';

// Set up multer storage and file filter
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        // create path
        const path = './uploads/' + file.fieldname;
        await fileService.createPath(path);

        cb(null, path); // Specify the directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.split('.').pop();
        const fileName = `${uniqueSuffix}.${ext}`;
        cb(null, fileName);

    }
});

const multerMemory = multer.memoryStorage();

const accept_image = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/gif']

const imageFilter = (req, file, cb) => {
    // Check if the file is an image (you can customize this check)
    if (accept_image.includes(file.mimetype.toLowerCase())) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

// use memory to be able to get buffer
const uploadImage = multer({ storage: multerMemory, fileFilter: imageFilter });
// const uploadImage = multer({ storage: storage, fileFilter: imageFilter });

const isFileExist = async (req, res) => {
    try {
        await fileService.isFileExist('./uploads' + req.url);
    } catch (error) {
        return res.status(404).json({ message: 'File Not found' });
    }
};

export {
    uploadImage,
    isFileExist
};