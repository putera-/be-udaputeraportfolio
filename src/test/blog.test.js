import supertest from "supertest";
import { app } from "../application/app.js";
import { doLogin, doLogout } from "./test-util.js";

describe("POST /blog", () => {
    let authCookie;
    beforeAll(async () => {
        authCookie = await doLogin();
    });

    afterAll(async () => {
        await doLogout(authCookie)
        authCookie = undefined;
    });

    it("should create new blog then delete", async () => {
        const createResult = await supertest(app)
            .post('/blog')
            .set('Cookie', authCookie)
            .send({
                title: "Test Title",
                content: "Test Content"
            });

        const deleteResult = await supertest(app)
            .delete('/blog/' + createResult.body.data.id)
            .set('Cookie', authCookie);

        expect(createResult.status).toBe(200);
        expect(createResult.body.errors).toBeUndefined();
        expect(createResult.body.data).toBeDefined();
        expect(createResult.body.data.title).toBe("Test Title");
        expect(createResult.body.data.content).toBe("Test Content");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.body.errors).toBeUndefined();
    });

    it("should fail create new blog: no data", async () => {
        const result = await supertest(app)
            .post('/blog')
            .set('Cookie', authCookie)
            .send();

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });
    it("should fail create new blog: no title", async () => {
        const result = await supertest(app)
            .post('/blog')
            .set('Cookie', authCookie)
            .send({
                content: "Test"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });
    it("should fail create new blog: no content", async () => {
        const result = await supertest(app)
            .post('/blog')
            .set('Cookie', authCookie)
            .send({
                title: "Test"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });
    it("should fail create new blog: title length", async () => {
        const result = await supertest(app)
            .post('/blog')
            .set('Cookie', authCookie)
            .send({
                title: "aa",
                content: "Test"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });
    it("should fail create new blog: content length", async () => {
        const result = await supertest(app)
            .post('/blog')
            .set('Cookie', authCookie)
            .send({
                title: "Test",
                content: "aa"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });
});