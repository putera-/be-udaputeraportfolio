import { prismaClient } from "../application/database.js"
import bcrypt from "bcrypt";

export const createTestUser = async () => {
    const data = {
        name: "Test User",
        email: "test@example.com",
        password: await bcrypt.hash("rahasia", 10)
    };
    await prismaClient.user.create({
        data
    });
}

// export const loginTestUser = async() => {

// }

export const removeTestUser = async () => {
    await prismaClient.user.delete({
        where: { email: "test@example.com" }
    })
}