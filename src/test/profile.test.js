import { app } from '../application/app.js';
import supertest from 'supertest';
import { doLogin, doLogout } from './test-util.js';

describe('/profile path', () => {
    let authCookie;

    beforeEach(async () => {
        authCookie = await doLogin();
    });

    afterEach(async () => {
        await doLogout(authCookie);
        authCookie = undefined;
    });

    it('should can get profile', async () => {
        const result = await supertest(app)
            .get('/profile');

        expect(result.status).toBe(200);
        expect(result.body.errors).toBeUndefined();
        expect(result.body.data).toBeDefined();
    });

    it('should can update profile', async () => {
        const result = await supertest(app)
            .put('/profile')
            .set('Cookie', authCookie)
            .send({
                firstname: 'John',
                lastname: 'Doe',
                email: 'test@example.com',
                dob: '1900-01-01',
                address: 'Jhon Address',
                phone: '+62 811-1111-1111',
                city: 'Jakarta',
                country: 'Indonesia'
            });

        expect(result.status).toBe(200);
        expect(result.body.errors).toBeUndefined();
        expect(result.body.data).toBeDefined();
        expect(result.body.data.firstname).toBe('John');
        expect(result.body.data.lastname).toBe('Doe');
        expect(result.body.data.email).toBe('test@example.com');
        expect(result.body.data.dob).toBe('1900-01-01');
        expect(result.body.data.readDob).toBe('1 Jan 1900');
        expect(result.body.data.address).toBe('Jhon Address');
    });

    describe('Fail Update', () => {
        it('should fail to update profile: no Auth', async () => {
            const result = await supertest(app)
                .put('/profile')
                .send({
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'test@example.com',
                    dob: '1900-01-01',
                    phone: '+62 811-1111-1111',
                    city: 'Jakarta',
                    country: 'Indonesia'
                });

            expect(result.status).toBe(401);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it('should fail to update profile: no Firstname', async () => {
            const result = await supertest(app)
                .put('/profile')
                .set('Cookie', authCookie)
                .send({
                    lastname: 'Doe',
                    email: 'test@example.com',
                    dob: '1900-01-01',
                    phone: '+62 811-1111-1111',
                    city: 'Jakarta',
                    country: 'Indonesia'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it('should fail to update profile: no Lastname', async () => {
            const result = await supertest(app)
                .put('/profile')
                .set('Cookie', authCookie)
                .send({
                    firstname: 'John',
                    email: 'test@example.com',
                    dob: '1900-01-01',
                    phone: '+62 811-1111-1111',
                    city: 'Jakarta',
                    country: 'Indonesia'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it('should fail to update profile: no dob', async () => {
            const result = await supertest(app)
                .put('/profile')
                .set('Cookie', authCookie)
                .send({
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'test@example.com',
                    phone: '+62 811-1111-1111',
                    city: 'Jakarta',
                    country: 'Indonesia'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it('should fail to update profile: Firstname lenght', async () => {
            const result = await supertest(app)
                .put('/profile')
                .set('Cookie', authCookie)
                .send({
                    firstname: 'Jo',
                    lastname: 'Doe',
                    email: 'test@example.com',
                    dob: '1900-01-01',
                    phone: '+62 811-1111-1111',
                    city: 'Jakarta',
                    country: 'Indonesia'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it('should fail to update profile: Lastname length', async () => {
            const result = await supertest(app)
                .put('/profile')
                .set('Cookie', authCookie)
                .send({
                    firstname: 'John',
                    lastname: 'Do',
                    email: 'test@example.com',
                    dob: '1900-01-01',
                    phone: '+62 811-1111-1111',
                    city: 'Jakarta',
                    country: 'Indonesia'
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

        it('should fail to update profile: wrong dob', async () => {
            const result = await supertest(app)
                .put('/profile')
                .set('Cookie', authCookie)
                .send({
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'test@example.com',
                    dob: '-',
                    phone: '+62 811-1111-1111',
                    city: 'Jakarta',
                    country: 'Indonesia'

                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
            expect(result.body.data).toBeUndefined();
        });

    });
});