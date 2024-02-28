import fs from 'fs/promises';
import path from 'path';
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
    const resizedBuffer = await sharp(buffer, { animated: true })
        .resize(size)
        .toBuffer();

    // Save the resized image to disk
    fs.writeFile(filepath, resizedBuffer);
};

const savePhotos = async (files, uniqueSuffix) => {
    const photos = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.originalname.split('.').pop();
        const buffer = file.buffer;

        // resize images to 600, 900, 1200
        const sizes = [{ key: 'sm', size: 600 }, { key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
        await Promise.all(
            sizes.map(async (s) => {
                const { key, size } = s;
                const filename = `${uniqueSuffix}${i}_${key}.${ext}`;
                const filepath = path.join('./uploads/photos/' + filename);

                await imageResizeSave(size, buffer, filepath);
            })
        );

        photos.push({
            index: i,
            path: `/uploads/photos/${uniqueSuffix}${i}_lg.${ext}`,
            path_md: `/uploads/photos/${uniqueSuffix}${i}_md.${ext}`,
            path_sm: `/uploads/photos/${uniqueSuffix}${i}_sm.${ext}`
        });
    }
    return photos;
};

const removePhotos = (files, uniqueSuffix) => {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.originalname.split('.').pop();

        removeFile(`/uploads/photos/${uniqueSuffix}${i}_lg.${ext}`);
        removeFile(`/uploads/photos/${uniqueSuffix}${i}_md.${ext}`);
        removeFile(`/uploads/photos/${uniqueSuffix}${i}_sm.${ext}`);
    }
};

export default {
    createPath,
    isFileExist,
    removeFile,
    imageResizeSave,
    savePhotos,
    removePhotos
};