import { prismaClient } from '../application/database.js';
import { validate } from '../validation/validation.js';
import { profileValidate } from '../validation/profile-validation.js';
import moment from 'moment';
import fileService from './file-service.js';

const _select = {
    firstname: true,
    lastname: true,
    email: true,
    bio: true,
    github: true,
    gitlab: true,
    linkedin: true,
    instagram: true,
    facebook: true,
    twitter: true,
};

const get = async () => {
    let profile = await prismaClient.profile.findFirst();
    if (!profile) {
        profile = {
            'firstname': '-',
            'lastname': '-',
            'email': '-',
            'dob': '1900-01-01',
            'address': '-'
        };
    }

    profile = formatData(profile);

    return profile;
};

const update = async (data) => {
    data = validate(profileValidate, data);

    const result = await create_or_update_profile(data);

    return result;
};

const create_or_update_profile = async (data) => {
    let profile = await prismaClient.profile.findFirst();

    if (profile) {
        const prevAvatar = profile.avatar;
        profile = await prismaClient.profile.update({
            where: { email: profile.email },
            data
        });

        // check avatar change
        if (prevAvatar && data.avatar) {
            if (prevAvatar != data.avatar) {
                // remove prevAvatar
                fileService.removeFile(prevAvatar);
            }
        }
    } else {
        profile = await prismaClient.profile.create({
            data
        });
    }

    profile = formatData(profile);

    return profile;
};

const formatData = (profile) => {
    profile.dob = moment(profile.dob).format('YYYY-MM-DD');
    profile.readDob = moment(profile.dob).format('D MMM YYYY');
    profile.whatsapp = profile.phone.replace(' ', '').replace('+', '').replaceAll('-', '');

    return profile;
};

export default {
    get,
    update
};