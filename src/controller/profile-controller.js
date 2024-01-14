import fileService from '../service/file-service.js';
import profileService from '../service/profile-service.js';
import skillService from '../service/skill-service.js';
import educationService from '../service/education-service.js';
import projectService from '../service/project-service.js';
import experienceService from '../service/experience-service.js';
import path from 'path';

const get = async (req, res, next) => {
    try {
        const data = await profileService.get();
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    // let fileName = '';
    let ext = req.file ? req.file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
        if (req.file) {
            const avatarBuffer = req.file.buffer;

            // resize images to 300, 600, 1200
            const sizes = [{ key: 'sm', size: 300 }, { key: 'md', size: 600 }, { key: 'lg', size: 1200 }];
            await Promise.all(
                sizes.map(async (s) => {
                    const { key, size } = s;
                    const filename = `${uniqueSuffix}_${key}.${ext}`;
                    const filepath = path.join('./uploads/avatar/' + filename);

                    await fileService.imageResizeSave(size, avatarBuffer, filepath)
                })
            );

            // req.body.avatar = '/uploads/avatar/' + fileName;
            req.body.avatar = `/uploads/avatar/${uniqueSuffix}_lg.${ext}`;
            req.body.avatar_md = `/uploads/avatar/${uniqueSuffix}_md.${ext}`;
            req.body.avatar_sm = `/uploads/avatar/${uniqueSuffix}_sm.${ext}`;
        }

        const data = await profileService.update(req.body);

        res.status(200).json({ data });
    } catch (error) {
        // trye remove avatar if failed
        if (req.file) {
            fileService.removeFile(`/uploads/avatar/${uniqueSuffix}_lg.${ext}`);
            fileService.removeFile(`/uploads/avatar/${uniqueSuffix}_md.${ext}`);
            fileService.removeFile(`/uploads/avatar/${uniqueSuffix}_sm.${ext}`);
        }
        next(error);
    }
};

const getPortFolio = async (req, res, next) => {
    try {
        // limit 4 data
        const filters = {
            page: 1,
            perPage: 4
        }

        const profile = await profileService.get();
        const skills = await skillService.getByCategory(req);
        const educations = await educationService.getAll(filters);
        const { data: experiences } = await experienceService.getAll(filters);
        const { data: projects } = await projectService.getAll(filters);

        return res.status(200).json({
            data: {
                profile,
                skills,
                educations,
                experiences,
                projects
            }
        })
    } catch (error) {
        next(error);
    }
}

export default {
    get,
    update,
    getPortFolio
};