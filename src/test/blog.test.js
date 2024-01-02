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

    describe("should create new blog then delete", () => {
        let id;
        it("should create new Blog", async () => {
            const result = await supertest(app)
                .post('/blog')
                .set('Cookie', authCookie)
                .send({
                    title: "Test Title",
                    content: "Test Content"
                });
            id = result.body.data.id;

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe("Test Title");
            expect(result.body.data.content).toBe("Test Content");
        });

        it("should get blog", async () => {
            const result = await supertest(app)
                .get('/blog/' + id);

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe("Test Title");
            expect(result.body.data.content).toBe("Test Content");
        });

        it("should update blog", async () => {
            const result = await supertest(app)
                .put('/blog/' + id)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Updated",
                    content: "Test Updated",
                });

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe("Test Updated");
            expect(result.body.data.content).toBe("Test Updated");
        });

        it("should delete blog", async () => {
            const result = await supertest(app)
                .delete('/blog/' + id)
                .set('Cookie', authCookie);

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
        });
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