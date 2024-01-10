import supertest from "supertest";
import { app } from "../application/app.js";
import { doLogin, doLogout } from "./test-util.js";

describe("/education path", () => {
    const page = 'Education';
    const path = '/education';
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
                    institutionName: "Test Education",
                    startYear: "2002"
                });
            id = result.body.data.id;

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.institutionName).toBe("Test Education");
            expect(result.body.data.startYear).toBe(2002);
            expect(result.body.data.endYear).toBe(null);
            expect(result.body.data.major).toBe(null);
            expect(result.body.data.degree).toBe(null);
        });

        it(`should get ${page}`, async () => {
            const result = await supertest(app)
                .get(`${path}/${id}`);

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.institutionName).toBe("Test Education");
            expect(result.body.data.startYear).toBe(2002);
            expect(result.body.data.endYear).toBe(null);
            expect(result.body.data.major).toBe(null);
            expect(result.body.data.degree).toBe(null);
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
                    institutionName: "Education Updated",
                    startYear: "2005",
                    endYear: "2009",
                    major: "Major Updated",
                    degree: "Degree Updated"
                });

            expect(result.status).toBe(200);
            expect(result.body.errors).toBeUndefined();
            expect(result.body.data).toBeDefined();
            expect(result.body.data.institutionName).toBe("Education Updated");
            expect(result.body.data.startYear).toBe(2005);
            expect(result.body.data.endYear).toBe(2009);
            expect(result.body.data.major).toBe("Major Updated");
            expect(result.body.data.degree).toBe("Degree Updated");
        });
    });

    describe(`Fail Create ${page}`, () => {
        it(`should fail create new ${page}: no auth`, async () => {
            const result = await supertest(app)
                .post(path)
                .send({
                    institutionName: "Test Education",
                    startYear: "2002",
                    endYear: "2005",
                    major: "Test Major",
                    degree: "Test Degree"
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

        it(`should fail create new ${page}: no institutionName`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    startYear: "2002"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: no startYear`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    institutionName: "Test Education"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: institutionName length`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    institutionName: "aa",
                    startYear: "2002"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: startYear error / next year`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    institutionName: "Test Education",
                    startYear: new Date().getFullYear() + 1
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail create new ${page}: endYear error / next year`, async () => {
            const result = await supertest(app)
                .post(path)
                .set('Cookie', authCookie)
                .send({
                    institutionName: "Test Education",
                    startYear: new Date().getFullYear(),
                    endYear: new Date().getFullYear() + 1
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
                    institutionName: "Test Education",
                    startYear: "2002",
                    endYear: "2005",
                    major: "Test Major",
                    degree: "Test Degree"
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

        it(`should fail update ${page}: no institutionName`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    startYear: "2002"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: no startYear`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    institutionName: "Test Education"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: institutionName length`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    institutionName: "aa",
                    startYear: "2002"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: startYear error / next year`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    institutionName: "Test Education",
                    startYear: new Date().getFullYear() + 1
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it(`should fail update ${page}: endYear error / next year`, async () => {
            const result = await supertest(app)
                .put(`${path}/${id}`)
                .set('Cookie', authCookie)
                .send({
                    institutionName: "Test Education",
                    startYear: new Date().getFullYear(),
                    endYear: new Date().getFullYear() + 1
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
                institutionName: "Education Updated",
                startYear: "2005",
                endYear: "2009",
                major: "Major Updated",
                degree: "Degree Updated",
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