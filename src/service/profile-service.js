import { prismaClient } from '../application/database.js';
import { validate } from '../validation/validation.js';
import { profileCreateValidation, profileUpdateValidation } from '../validation/profile-validation.js';
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
    let profile = await prismaClient.profile.findFirst();

    if (!profile) {
        profile = await createProfile(data);
    } else {
        profile = await updateProfile(profile, data);
    }

    formatData(profile);

    return profile;
};

const createProfile = data => {
    data = validate(profileCreateValidation, data);

    return prismaClient.profile.create({ data });
};

const updateProfile = async (oldProfile, data) => {
    data = validate(profileUpdateValidation, data);

    const { avatar: prevAvatar, avatar_md: prevAvatar_md, avatar_sm: prevAvatar_sm } = oldProfile;

    const profile = await prismaClient.profile.update({
        where: { email: oldProfile.email },
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

    return profile
}

const formatData = (profile) => {
    profile.dob = dayjs(profile.dob).format('YYYY-MM-DD');
    profile.readDob = dayjs(profile.dob).format('D MMM YYYY');
    profile.whatsapp = profile.phone.replace(' ', '').replace('+', '').replaceAll('-', '');
};

export default {
    get,
    update
};