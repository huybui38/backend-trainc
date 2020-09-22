// const { before, after } = require('lodash');
const {request,createAdmin,cleanup,setupDatabase} = require('../../helpers');

describe('Change password user /:code/password', () => {
    let db,cookie;
    beforeAll(async()=>{
        db = await setupDatabase('change_password_user');
        await createAdmin(db);
    });
    afterAll(async ()=>{
        await cleanup(db);
    });
    describe("", () => {
        it("should login user successful", async (done) => {
            const res = await  request
              .post('/api/users/login')
              .send({
                code: "admin123",
                password: "123456789"
            })
            cookie = res.headers['set-cookie'][0];
            expect(res.status).toEqual(200);
            expect(res.text).toMatch("Login success.");
            done();
        });
    
        it("should change password success", async () => {
            const res = await request 
                .put('/api/users/admin123/passwords')
                .set("cookie", cookie)
                .send({
                    password: "123456789",
                    newPassword: "1234567890",
                    confirm: "1234567890"
                })
            expect(res.status).toEqual(200);
        })

        it("should change password invalid input", async () => {
            const res = await request 
                .put('/api/users/admin123/passwords')
                .set("cookie", cookie)
                .send({
                    password: "00",
                    newPassword: "000000000",
                    confirm: "000000000"
                })
            expect(res.status).toEqual(400);
            expect(res.body.message).toMatch('"password" length must be at least 5 characters long');
        })

        it("should change password invalid input", async () => {
            const res = await request 
                .put('/api/users/admin123/passwords')
                .set("cookie", cookie)
                .send({
                    password: "123456789",
                    newPassword: "000000000",
                    confirm: "111111111"
                })
            expect(res.status).toEqual(400);
        })

        it("should change password invalid input", async () => {
            const res = await request 
                .put('/api/users/admin123/passwords')
                .set("cookie", cookie)
                .send({
                    password: "123456789",
                    newPassword: "0",
                    confirm: "0"
                })
            expect(res.status).toEqual(400);
            expect(res.body.message).toMatch('"newPassword" length must be at least 5 characters long');
        })

        it("should change password unauthorized", async () => {
            const res = await request 
                .put('/api/users/admin123/passwords')
                .set("cookie", cookie)
                .send({
                    password: "987654321",
                    newPassword: "000000000",
                    confirm: "000000000"
                })
            expect(res.status).toEqual(401);
            expect(res.body.message).toMatch('Password is not correct');
        })
    })

})