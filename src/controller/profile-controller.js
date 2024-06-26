import fileService from '../service/file-service.js';
import profileService from '../service/profile-service.js';
import skillService from '../service/skill-service.js';
import educationService from '../service/education-service.js';
import projectService from '../service/project-service.js';
import experienceService from '../service/experience-service.js';
import path from 'path';
import blogService from '../service/blog-service.js';
import dayjs from 'dayjs';

const get = async (req, res, next) => {
    try {
        const data = await profileService.get();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    // let fileName = '';
    const ext = req.file ? req.file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
        if (req.file) {
            const avatarBuffer = req.file.buffer;

            // resize images to 600, 900, 1200
            const sizes = [{ key: 'sm', size: 600 }, { key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
            await Promise.all(
                sizes.map(async (s) => {
                    const { key, size } = s;
                    const filename = `${uniqueSuffix}_${key}.${ext}`;
                    const filepath = path.join('./uploads/avatar/' + filename);

                    await fileService.imageResizeSave(size, avatarBuffer, filepath);
                })
            );

            req.body.avatar = `/uploads/avatar/${uniqueSuffix}_lg.${ext}`;
            req.body.avatar_md = `/uploads/avatar/${uniqueSuffix}_md.${ext}`;
            req.body.avatar_sm = `/uploads/avatar/${uniqueSuffix}_sm.${ext}`;
        }

        const data = await profileService.update(req.body);

        res.status(200).json(data);
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
            limit: 4
        };

        const profile = await profileService.get();
        const skills = await skillService.getByCategory(req);
        const educations = await educationService.getAll(filters);
        const { data: experiences } = await experienceService.getAll({
            page: 1,
            limit: 100
        });
        const { data: projects } = await projectService.getAll(filters);
        const { data: blogs } = await blogService.getAll(filters);

        const firstProject = await projectService.getFirstProject();

        // calculate projects
        profile.count_project = projects.length;

        // calculate year & month of experience
        if (projects.length) {
            const firsProjectDate = dayjs(firstProject.startDate);
            profile.year_of_experience = dayjs().diff(firsProjectDate, 'year');
            profile.month_of_experience = dayjs().diff(firsProjectDate, 'month');
        } else {
            // default
            profile.year_of_experience = 0;
            profile.month_of_experience = 0;
        }

        return res.status(200).json({
            profile,
            skills,
            educations,
            experiences,
            projects,
            blogs
        });
    } catch (error) {
        next(error);
    }
};

export default {
    get,
    update,
    getPortFolio
};