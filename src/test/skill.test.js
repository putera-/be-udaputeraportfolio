import supertest from 'supertest';
import { app } from '../application/app.js';
import { doLogin, doLogout } from './test-util.js';

describe('/skill path', () => {
    const page = 'Skill';
    const path = '/skill';
    let authCookie;
    let id;
    let categoryid;

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
                    title: 'Test Title',
                    category: 'Test Category'
                });

            id = result.body.data.id;
            // categoryid = result.body.data.category.id;

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe('Test Title');
            expect(result.body.data.category.title).toBe('TEST CATEGORY');
        });

        it(`should get ${page}`, async () => {
            const result = await supertest(app)
                .get(`${path}/${id}`);

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe('Test Title');
            expect(result.body.data.category.title).toBe('TEST CATEGORY');
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
                    title: 'Test Updated',
                    category: 'Test Updated',
                });

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe('Test Updated');
            expect(result.body.data.category.title).toBe('TEST UPDATED');
        });
    });

    describe(`Fail Create ${page}`, () => {
        it(`should fail create new ${page}: no auth`, async () => {
            const result = await supertest(app)
                .post(path)
                .send({
                    title: 'Test Title',
                    category: 'Test Category'
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
                    category: 'Test Category'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: no category`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: 'Test Test'
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
                    title: 'aa',
                    category: 'Test Category'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: category length`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: 'Test Title',
                    category: 'aa'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });
    });

    describe('Fail Update Blog', () => {
        it(`should fail update ${page}: no auth`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .send({
                    title: 'Test Title',
                    category: 'Test Category'
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
                    category: 'Test Category'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: no category`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: 'Test Title'
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
                    title: 'aa',
                    category: 'Test Category'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: category length`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: 'Test',
                    category: 'aa'
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
                title: 'Test Updated',
                category: 'Test Updated'
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