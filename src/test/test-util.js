import supertest from "supertest";
import { prismaClient } from "../application/database.js"
import bcrypt from "bcrypt";
import { app } from "../application/app.js";

export const createTestUser = async () => {
    const data = {
        name: "Test User",
        email: "test@example.com",
        password: await bcrypt.hash("rahasia", 10)
    };
    await prismaClient.user.create({ data });
}

export const removeTestUser = async () => {
    await prismaClient.user.delete({
        where: { email: "test@example.com" }
    })
}

export const doLogin = async () => {
    await createTestUser();
    const result = await supertest(app)
        .post('/login')
        .send({
            email: "test@example.com",
            password: "rahasia"
        });

    return result.headers['set-cookie'];
}

export const doLogout = async (authCookie) => {
    await supertest(app)
        .delete('/logout')
        .set('Cookie', authCookie);

    await removeTestUser();
}