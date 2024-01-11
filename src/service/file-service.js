import fs from 'fs/promises';

const createPath = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        await fs.mkdir(path)
    }
}

export default {
    createPath
}