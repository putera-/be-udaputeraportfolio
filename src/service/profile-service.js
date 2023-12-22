import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { profileValidate } from "../validation/profile-validation.js";

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
}

const get = async (request) => {
    return prismaClient.profile.findFirst({
        select: _select
    });
}

const update = async (data) => {
    data = validate(profileValidate, data);

    const result = await create_or_update_profile(data);

    return result;
}

const create_or_update_profile = async (data) => {
    let profile = await prismaClient.profile.findFirst();

    if (profile) {
        profile = await prismaClient.profile.update({
            where: { email: profile.email },
            data,
            select: _select
        });
    } else {
        profile = await prismaClient.profile.create({
            data,
            select: _select
        });
    }
    return profile;
}

export default {
    get,
    update
}