import supertest from "supertest";
import { app } from "../application/app.js";
import { doLogin, doLogout } from "./test-util.js";

describe("/blog path", () => {
    const page = 'Blog';
    const path = '/blog';
    let authCookie;
    let id;

    beforeEach(async () => {
        authCookie = await doLogin();
    });

    afterEach(async () => {
        await doLogout(authCookie);
        authCookie = undefined;
    });

    describe(`should create new ${page} then delete`, () => {
        it(`should create new ${page}`, async () => {
            const result = await supertest(app)
                .post(path)
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

        it(`should get ${page}`, async () => {
            const result = await supertest(app)
                .get(`${path}/${id}`);

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe("Test Title");
            expect(result.body.data.content).toBe("Test Content");
        });

        it(`should get ${page}s`, async () => {
            const result = await supertest(app)
                .get(`${path}s`);

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(Array.isArray(result.body.data)).toBe(true);
        });

        it(`should update ${page}`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
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
    });

    describe(`Fail Create ${page}`, () => {
        it(`should fail create new ${page}: no auth`, async () => {
            const result = await supertest(app)
                .post(path)
                .send({
                    title: "Test Title",
                    content: "Test Content"
                });

            expect(result.status).toBe(401);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: no data`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send();

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: no title`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    content: "Test"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: no content`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: title length`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "aa",
                    content: "Test"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: content length`, async () => {
            const result = await supertest(app)
                .post(path)
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

    describe("Fail Update Blog", () => {
        it(`should fail update ${page}: no auth`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .send({
                    title: "Test Title",
                    content: "Test Content"
                });

            expect(result.status).toBe(401);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: no data`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send();

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: no title`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    content: "Test"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: no content`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "Test"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: title length`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "aa",
                    content: "Test"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: content length`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
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

    it(`should fail delete ${page}: no auth`, async () => {
        const result = await supertest(app)
            .delete(`${path}/${id}`);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it(`should delete ${page}`, async () => {
        const result = await supertest(app)
            .delete(`${path}/${id}`)
            .set('Cookie', authCookie);

        expect(result.status).toBe(200);
        expect(result.body.errors).toBeUndefined();
    });

    it(`should fail get ${page}: not found`, async () => {
        const result = await supertest(app)
            .get(`${path}/${id}`)
            .set('Cookie', authCookie);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it(`should fail update ${page}: not found`, async () => {
        const result = await supertest(app)
            .put(`${path}/${id}`)
            .set('Cookie', authCookie)
            .send({
                title: "Test Updated",
                content: "Test Updated"
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });

    it(`should fail delete ${page}: not found`, async () => {
        const result = await supertest(app)
            .delete(`${path}/${id}`)
            .set('Cookie', authCookie);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});