import { prismaClient } from "../application/database.js"

export const createTestUser = async () => {
    const data = {
        name: "Test User",
        email: "test@example.com",
        password: "rahasia",
        token: "test"
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