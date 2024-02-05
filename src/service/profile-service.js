import { prismaClient } from '../application/database.js';
import { validate } from '../validation/validation.js';
import { profileValidate } from '../validation/profile-validation.js';
import dayjs from 'dayjs';
import fileService from './file-service.js';

const get = async () => {
    let profile = await prismaClient.profile.findFirst();
    if (!profile) {
        profile = {
            'firstname': '-',
            'lastname': '-',
            'job': '-',
            'email': '-',
            'phone': '-',
            'dob': '1900-01-01',
            'address': '-',
            'city': '-',
            'country': '-',
        };
    }

    formatData(profile);

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
        const { avatar: prevAvatar, avatar_md: prevAvatar_md, avatar_sm: prevAvatar_sm } = profile;

        profile = await prismaClient.profile.update({
            where: { email: profile.email },
            data
        });

        // check avatar change
        if (prevAvatar && data.avatar) {
            if (prevAvatar != data.avatar) {
                // remove prevAvatar
                fileService.removeFile(prevAvatar);
                fileService.removeFile(prevAvatar_md);
                fileService.removeFile(prevAvatar_sm);
            }
        }
    } else {
        profile = await prismaClient.profile.create({
            data
        });
    }

    formatData(profile);

    return profile;
};

const formatData = (profile) => {
    profile.dob = dayjs(profile.dob).format('YYYY-MM-DD');
    profile.readDob = dayjs(profile.dob).format('D MMM YYYY');
    profile.whatsapp = profile.phone.replace(' ', '').replace('+', '').replaceAll('-', '');
};

export default {
    get,
    update
};