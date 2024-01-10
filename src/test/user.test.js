import supertest from 'supertest';
import { app } from '../application/app.js';
import { doLogin, doLogout } from './test-util.js';

describe('/user path', () => {
    let authCookie;
    beforeEach(async () => {
        authCookie = await doLogin();
    });

    afterEach(async () => {
        await doLogout(authCookie);
        authCookie = undefined;
    });

    it('should get user', async () => {
        const result = await supertest(app)
            .get('/user')
            .set('Cookie', authCookie);

        expect(result.status).toBe(200);
        expect(result.body.errors).toBeUndefined();
        expect(result.body.data).toBeDefined();
    });

    it('should update user', async () => {
        const result = await supertest(app)
            .patch('/user')
            .set('Cookie', authCookie)
            .send({
                name: 'Update User Name',
                password: 'newrahasia',
                password_confirm: 'newrahasia'
            });

        expect(result.status).toBe(200);
        expect(result.body.errors).toBeUndefined();
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe('Update User Name');
    });

    it('should faile update user: no data', async () => {
        const result = await supertest(app)
            .patch('/user')
            .set('Cookie', authCookie);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });

    it('should faile update user: password not match', async () => {
        const result = await supertest(app)
            .patch('/user')
            .set('Cookie', authCookie)
            .send({
                name: 'Update User Name',
                password: 'newrahasia',
                password_confirm: 'newrahasiaa'
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        expect(result.body.data).toBeUndefined();
    });
});