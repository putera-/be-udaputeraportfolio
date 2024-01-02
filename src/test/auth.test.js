import { app } from "../application/app.js";
import supertest from "supertest";
import { createTestUser, removeTestUser } from "./test-util.js"

describe("POST /login", () => {
    beforeAll(async () => {
        await createTestUser();
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it("should can login", async () => {
        const result = await supertest(app)
            .post('/login')
            .send({
                email: "test@example.com",
                password: "rahasia"
            });

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe("Test User");
        expect(result.body.data.email).toBe("test@example.com");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should failed to login: wrong email", async () => {
        const result = await supertest(app)
            .post('/login')
            .send({
                email: "test2@example.com",
                password: "rahasia"
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Invalid Credential");
        expect(result.body.data).toBeUndefined();
    });

    it("should failed to login: wrong password", async () => {
        const result = await supertest(app)
            .post('/login')
            .send({
                email: "test@example.com",
                password: "123456"
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Invalid Credential");
        expect(result.body.data).toBeUndefined();
    });

    // FIXME how to send credential
    // it("should logout", async () => {
    //     const result = await supertest(app)
    //         .delete('/logout');
    //     console.log(result.body);
    //     expect(result.status).toBe(200);
    //     expect(result.body.success).toBe(true);
    // });
});