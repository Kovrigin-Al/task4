import request from "supertest";
import { app } from "../index";
describe("/", () => {
    it("should return Hello World", async () => {
        const response = await request(app).get('/')
        console.log(response.status);
        console.log(response.text);
        expect(response.text).toEqual("Hello World!");
    });
});
