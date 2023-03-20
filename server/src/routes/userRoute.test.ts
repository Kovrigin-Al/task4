import request from "supertest";
import { app } from "../index";
import { Users } from "../models/usersModel";
import { HTTP_STATUS } from "../types/consts/httpStatuses";
import { ROUTES } from "../types/consts/routes";

const testName = 'testName';
const testEmail = '123@gmail.com';
const testPassword = '1';
const invalidEmail = 'invalidEmail';
const invalidName = undefined;
const invalidPassword = undefined;
const falseEmail = 'falseEmail@gmail.com';
const falsePassword = 'falsePassword';
let freshToken: string;
const expiredToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyNEBtYWlsLnJ1Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NzIxNjU2MjksImV4cCI6MTY3MjE2OTIyOX0.6HyV_dniPVYDa0SrmIeTJPHZl4h3Z0j6ne-6Ih8lsJo';

describe("/registration", () => {
    it("should return token and 201", async () => {
        const response = await request(app).post(ROUTES.REGISTRATION)
            .send({ email: testEmail, password: testPassword, name: testName })
            .expect(HTTP_STATUS.CREATED_201);
        expect(response.body.token).toMatch(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
        freshToken = response.body.token
    });

    it("should return 400 and \"Wrong credentials: Invalid value in email\"", async () => {
        const response = await request(app).post(ROUTES.REGISTRATION)
            .send({ email: invalidEmail, password: testPassword, name: testName })
            .expect(HTTP_STATUS.BAD_REQUEST_400);
        expect(response.body.message).toMatch('Wrong credentials: Invalid value in email')
    });

    it("should return 400 and \"Wrong credentials: Invalid value in name\"", async () => {
        const response = await request(app).post(ROUTES.REGISTRATION)
            .send({ email: testEmail, password: testPassword, name: invalidName })
            .expect(HTTP_STATUS.BAD_REQUEST_400);
        expect(response.body.message).toMatch('Wrong credentials: Invalid value in name')
    });

    it("should return 400 and \"Wrong credentials: Invalid value in password\"", async () => {
        const response = await request(app).post(ROUTES.REGISTRATION)
            .send({ email: testEmail, password: invalidPassword, name: testName })
            .expect(HTTP_STATUS.BAD_REQUEST_400);
        expect(response.body.message).toMatch('Wrong credentials: Invalid value in password')
    });

});

describe("/login", () => {
    it("should return 200 and token", async () => {
        const response = await request(app).post(ROUTES.LOGIN)
            .send({ email: testEmail, password: testPassword })
            .expect(HTTP_STATUS.OK_200);
        expect(response.body.token).toMatch(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    });

    it("should return 400 and \"Wrong credentials: Invalid value in email\"", async () => {
        const response = await request(app).post(ROUTES.LOGIN)
            .send({ email: invalidEmail, password: testPassword })
            .expect(HTTP_STATUS.BAD_REQUEST_400);
        expect(response.body.message).toMatch(/^Wrong credentials: .*/)
    });

    it("should return 400 and \"Wrong credentials: Invalid value in password\"", async () => {
        const response = await request(app).post(ROUTES.LOGIN)
            .send({ email: testEmail, password: invalidPassword })
            .expect(HTTP_STATUS.BAD_REQUEST_400);
        expect(response.body.message).toMatch(/^Wrong credentials: .*/)
    });

    it('should return 404 and \"User is not found\"', async () => {
        const response = await request(app).post(ROUTES.LOGIN)
            .send({ email: testEmail, password: falsePassword })
            .expect(HTTP_STATUS.NOT_FOUND_404);
        expect(response.body.message).toMatch('User is not found')
    });

    it('should return 404 and \"User is not found\"', async () => {
        const response = await request(app).post(ROUTES.LOGIN)
            .send({ email: falseEmail, password: testPassword })
            .expect(HTTP_STATUS.NOT_FOUND_404);
        expect(response.body.message).toMatch('User is not found')
    });

    it('should clean up test effects from db', async () => {
        await Users.destroy({
            where: {
                email: testEmail
            }
        })
        await request(app).post(ROUTES.LOGIN)
            .send({ email: testEmail, password: testPassword })
            .expect(HTTP_STATUS.NOT_FOUND_404);
    })
});

describe("/auth", () => {
    it("should return 200 and {token: newToken}", async () => {
        const response = await request(app)
            .get(ROUTES.CHECK_AUTH)
            .set("Authorization", `Bearer ${freshToken}`)
            .expect(HTTP_STATUS.OK_200);
        expect(response.body.token).toMatch(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    })

    it("should return 401 and Unauthorized", async () => {
        await request(app)
            .get("/api/user/auth")
            .set("Authorization", `Bearer ${expiredToken}`)
            .expect(HTTP_STATUS.UNAUTHORIZED_401, { message: "Unauthorized" });
    })

    it("should return 401 and Unauthorized", async () => {
        await request(app)
            .get("/api/user/auth")
            .expect(HTTP_STATUS.UNAUTHORIZED_401, { message: "Unauthorized" });
    })
})