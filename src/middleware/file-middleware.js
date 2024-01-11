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
        const fileName = uniqueSuffix + '.' + file.originalname.split('.').pop();
        cb(null, fileName);

    }
});

const fileFilter = (req, file, cb) => {
    // Check if the file is an image (you can customize this check)
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const uploadImage = multer({ storage: storage, fileFilter: fileFilter });

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