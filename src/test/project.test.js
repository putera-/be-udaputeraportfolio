import supertest from "supertest";
import { app } from "../application/app.js";
import { doLogin, doLogout } from "./test-util.js";
import moment from "moment";

describe("/project path", () => {
    const page = 'Project';
    const path = '/project';
    let authCookie;
    let id;

    const date = new Date();
    const startDate = moment(date).subtract(7, 'days').format('YYYY-MM-DD');
    const endDate = moment(date).format('YYYY-MM-DD');
    const updatestartDate = moment(date).format('YYYY-MM-DD');

    const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');

    beforeEach(async () => {
        authCookie = await doLogin();
    });

    afterEach(async () => {
        await doLogout(authCookie)
        authCookie = undefined;
    });

    describe(`should create new ${page} then delete`, () => {
        it(`should create new ${page}`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate
                });
            id = result.body.data.id;

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe("Test Project");
            expect(result.body.data.description).toBe("Test Project Description");
            expect(result.body.data.url).toBe(null);
            expect(result.body.data.github).toBe(null);
            expect(result.body.data.gitlab).toBe(null);
            expect(result.body.data.startDate).toBe(startDate);
            expect(result.body.data.endDate).toBe(null);
            expect(result.body.data.status).toBe("ON PROGRESS");
            expect(result.body.data.company).toBe(null);
        });

        it(`should get ${page}`, async () => {
            const result = await supertest(app)
                .get(`${path}/${id}`);

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe("Test Project");
            expect(result.body.data.description).toBe("Test Project Description");
            expect(result.body.data.url).toBe(null);
            expect(result.body.data.github).toBe(null);
            expect(result.body.data.gitlab).toBe(null);
            expect(result.body.data.startDate).toBe(startDate);
            expect(result.body.data.endDate).toBe(null);
            expect(result.body.data.status).toBe("ON PROGRESS");
            expect(result.body.data.company).toBe(null);
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
                    title: "Project Updated",
                    description: "Update Project Description",
                    url: "http://localhost.com",
                    github: "http://localhost.com",
                    gitlab: "http://localhost.com",
                    startDate: updatestartDate,
                    endDate: endDate,
                    status: 'COMPLETE',
                    company: "Project Company"
                });

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.title).toBe("Project Updated");
            expect(result.body.data.description).toBe("Update Project Description");
            expect(result.body.data.url).toBe("http://localhost.com");
            expect(result.body.data.github).toBe("http://localhost.com");
            expect(result.body.data.gitlab).toBe("http://localhost.com");
            expect(result.body.data.startDate).toBe(updatestartDate);
            expect(result.body.data.endDate).toBe(endDate);
            expect(result.body.data.status).toBe("COMPLETE");
            expect(result.body.data.company).toBe("Project Company");
        });
    });

    describe(`Fail Create ${page}`, () => {
        it(`should fail create new ${page}: no auth`, async () => {
            const result = await supertest(app)
                .post(path)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate
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
                    description: "Test Project Description",
                    startDate: startDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: no description`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    startDate: startDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: no startDate`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
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
                    description: "Test Project Description",
                    startDate: startDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: description length`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "aa",
                    startDate: startDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: startYear error / next date`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: nextDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: endDate error / greater than startDate`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate,
                    endDate: nextDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: status error / undefined enum`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate,
                    status: "WORKING"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: company length`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate,
                    company: 'aa'
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
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate
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
                    description: "Test Project Description",
                    startDate: startDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: no description`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    startDate: startDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: no startDate`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
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
                    description: "Test Project Description",
                    startDate: startDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: description length`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "aa",
                    startDate: startDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: startYear error / next date`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: nextDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: endDate error / greater than startDate`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate,
                    endDate: nextDate
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: status error / undefined enum`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate,
                    status: "WORKING"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: company length`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    title: "Test Project",
                    description: "Test Project Description",
                    startDate: startDate,
                    company: 'aa'
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
                title: "Test Project",
                description: "Test Project Description",
                startDate: startDate
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it(`should fail delete ${page}: not found`, async () => {
        const result = await supertest(app)
            .delete(`${path}/${id}`)
            .set('Cookie', authCookie);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});