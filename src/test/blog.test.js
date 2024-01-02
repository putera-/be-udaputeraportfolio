import supertest from "supertest";
import { app } from "../application/app.js";
import { doLogin, doLogout } from "./test-util.js";

describe("POST /blog", () => {
    let authCookie
    beforeAll(async () => {
        authCookie = doLogin();

    })
    afterAll(async () => {
        doLogout()
        authCookie = undefined;
    });

    it("should create new blog", async () => {
        const result = await supertest(app)
            .post('/blog')
            .send({
                title: "Test Title",
                content: "Test Content"
            });

        expect(result.status).toBe(200);
        expect(result.body.errors).toBeUndefined();
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Test Title");
        expect(result.body.data.content).toBe("Test Content");

    });
});