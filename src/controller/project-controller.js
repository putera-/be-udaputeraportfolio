import path from 'path';
import fileService from '../service/file-service.js';
import projectService from '../service/project-service.js';

const getAll = async (req, res, next) => {
    try {
        const filters = {
            title: req.query.search,
            description: req.query.search,
            company: req.query.search,
            page: req.query.page || 1,
            perPage: req.query.perpage || 10
        };

        const data = await projectService.getAll(filters);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await projectService.get(id);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
        const photos = []
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i];
                const ext = file.originalname.split('.').pop();
                const buffer = file.buffer;

                // resize images to 300, 600, 1200
                const sizes = [{ key: 'sm', size: 300 }, { key: 'md', size: 600 }, { key: 'lg', size: 1200 }];
                await Promise.all(
                    sizes.map(async (s) => {
                        const { key, size } = s;
                        const filename = `${uniqueSuffix}${i}_${key}.${ext}`;
                        const filepath = path.join('./uploads/photos/' + filename);

                        await fileService.imageResizeSave(size, buffer, filepath)
                    })
                );

                photos.push({
                    path: `/uploads/photos/${uniqueSuffix}${i}_lg.${ext}`,
                    path_md: `/uploads/photos/${uniqueSuffix}${i}_md.${ext}`,
                    path_sm: `/uploads/photos/${uniqueSuffix}${i}_sm.${ext}`
                });
            }
        }


        const data = await projectService.create(req.body, photos);

        res.status(200).json({ data });
    } catch (error) {
        // remove photos
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i];
                const ext = file.originalname.split('.').pop();

                fileService.removeFile(`/uploads/photos/${uniqueSuffix}${i}_lg.${ext}`);
                fileService.removeFile(`/uploads/photos/${uniqueSuffix}${i}_md.${ext}`);
                fileService.removeFile(`/uploads/photos/${uniqueSuffix}${i}_sm.${ext}`);
            }
        }

        next(error);
    }
};

const update = async (req, res, next) => {
    // TODO handle photo update
    try {
        const id = req.params.id;
        const data = await projectService.update(id, req.body);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await projectService.remove(id);

        res.status(200).json({ success: true });

    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};