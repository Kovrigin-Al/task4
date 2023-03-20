import request from "supertest";
import { app } from "../index";
import { HTTP_STATUS } from "../types/consts/httpStatuses";
import { ROUTES } from "../types/consts/routes";
import { IUser } from "../types/databaseTypes";

const testName = 'testame';
const testEmail = '1234@gmail.com';
const testPassword = '2';
let freshToken: string;
let userCreated: IUser;
const updatedName = 'testnameUpdated'

describe("/users", () => {
    it("should return users array and 200", async () => {
        freshToken = await (await request(app).post(ROUTES.REGISTRATION).send({ email: testEmail, password: testPassword, name: testName })).body.token
        const response = await request(app)
            .get(ROUTES.USERS)
            .set("Authorization", `Bearer ${freshToken}`)
            .expect(HTTP_STATUS.OK_200);
        userCreated = response.body[response.body.length - 1];
        response.body.forEach((u: IUser) => {
            expect(u).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                last_login_time: expect.any(String),
                registration_time: expect.any(String),
                status: expect.any(String),
            });
        })
    });

    it("should return updated users array and 200", async () => {
        const response = await request(app)
            .post(ROUTES.USERS)
            .set("Authorization", `Bearer ${freshToken}`)
            .send({
                users: [{
                    id: userCreated.id,
                    name: updatedName,
                    email: userCreated.email,
                    last_login_time: userCreated.last_login_time,
                    registration_time: userCreated.registration_time,
                    status: userCreated.status,
                }]
            })
            .expect(HTTP_STATUS.OK_200);
        expect(response.body[0]).toMatchObject({
            id: userCreated.id,
            name: updatedName,
            email: userCreated.email,
            last_login_time: userCreated.last_login_time,
            registration_time: userCreated.registration_time,
            status: userCreated.status,
        });

    })

    it("should return 204", async () => {
        await request(app)
            .delete(ROUTES.USERS)
            .set("Authorization", `Bearer ${freshToken}`)
            .send({
                users: [{
                    id: userCreated.id,
                    name: updatedName,
                    email: userCreated.email,
                    last_login_time: userCreated.last_login_time,
                    registration_time: userCreated.registration_time,
                    status: userCreated.status,
                }]
            })
            .expect(HTTP_STATUS.NO_CONTENT_204);
        await request(app).post(ROUTES.LOGIN)
            .send({ email: userCreated.email, password: testPassword })
            .expect(HTTP_STATUS.NOT_FOUND_404);
    })
})