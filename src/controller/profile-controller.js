import fileService from '../service/file-service.js';
import profileService from '../service/profile-service.js';
import skillService from '../service/skill-service.js';
import educationService from '../service/education-service.js';
import projectService from '../service/project-service.js';
import experienceService from '../service/experience-service.js';

const get = async (req, res, next) => {
    try {
        const data = await profileService.get();
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.avatar = '/' + req.file.path.replaceAll('\\', '/');
        }

        const data = await profileService.update(req.body);

        res.status(200).json({ data });
    } catch (error) {
        // remove avatar if failed
        if (req.file) {
            fileService.removeFile(req.body.avatar);
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