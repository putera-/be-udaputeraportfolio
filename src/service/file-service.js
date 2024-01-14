import fs from 'fs/promises';
import sharp from 'sharp';

const createPath = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        await fs.mkdir(path);
    }
};

const isFileExist = async (file) => {
    try {
        await fs.access(file);
    } catch (error) {
        throw (error);
    }
};

const removeFile = async (file) => {
    try {
        await fs.rm('.' + file);
    } catch (error) {
        throw (error);
    }
};

const imageResizeSave = async (size, buffer, filepath) => {
    const resizedBuffer = await sharp(buffer)
        .resize(size)
        .toBuffer();

    // Save the resized image to disk
    fs.writeFile(filepath, resizedBuffer);
}

export default {
    createPath,
    isFileExist,
    removeFile,
    imageResizeSave
};