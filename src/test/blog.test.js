import supertest from "supertest";
import { app } from "../application/app.js";
import { createTestUser, removeTestUser } from "./test-util.js";

// TODO undone
describe("POST /blog", () => {
    beforeAll(async () => {
        createTestUser();

    })
    afterAll(async () => {
        removeTestUser();
    });

    it("should create new blog", async () => {
        const result = await supertest(app)
            .post('/blog')
            .send({
                title: "Test Title",
                content: "Test Content"
            });

        expect(result.status).toBe(200);
        expect(result.body.title).toBe("Test Title");
        expect(result.body.content).toBe("Test Content");
    });
});