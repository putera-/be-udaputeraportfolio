import fs from 'fs/promises';

const createPath = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        await fs.mkdir(path)
    }
}

const isFileExist = async (file) => {
    try {
        await fs.access(file)
    } catch (error) {
        throw (error);
    }
}

export default {
    createPath,
    isFileExist
}