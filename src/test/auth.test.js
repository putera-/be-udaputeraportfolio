import { app } from "../application/app.js";
import supertest from "supertest";
import { createTestUser, removeTestUser } from "./test-util.js"

describe("/login path", () => {
    let authCookie;
    beforeAll(async () => {
        await createTestUser();
    });

    afterAll(async () => {
        await removeTestUser();
        authCookie = undefined;
    });

    it("should can login", async () => {
        const result = await supertest(app)
            .post('/login')
            .send({
                email: "test@example.com",
                password: "rahasia"
            });

        authCookie = result.headers['set-cookie'];

        expect(result.status).toBe(200);
        expect(result.body.errors).toBeUndefined();
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe("Test User");
        expect(result.body.data.email).toBe("test@example.com");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should failed to login: unknown data is not allowed", async () => {
        const result = await supertest(app)
            .post('/login')
            .send({
                email: "test@example.com",
                password: "rahasia",
                name: "I am test"
            });

        expect(result.status).toBe(400);
        expect(result.body.data).toBeUndefined();
        expect(result.body.errors).toBeDefined();
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
        expect(result.body.data).toBeUndefined();
    });

    it("auth failed: wrong cookie", async () => {
        const result = await supertest(app)
            .delete('/skill/1')
            .set('Cookie', 'wrong');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });

    it("should logout", async () => {
        const result = await supertest(app)
            .delete('/logout')
            .set('Cookie', authCookie);

        expect(result.status).toBe(200);
        expect(result.body.errors).toBeUndefined();
        expect(result.body.success).toBeDefined();
        expect(result.body.success).toBe(true);
    });

    it("should failed to logout", async () => {
        const result = await supertest(app)
            .delete('/logout')
            .set('Cookie', 'wrong');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });
});