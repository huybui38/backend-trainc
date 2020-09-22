const {request, cleanup, setupDatabase, createUsers} = require('../../helpers');
var cookie;

describe('Change password user /:code/password', () => {
    beforeAll(async()=>{
        db = await setupDatabase('change_password_user');
        await createUsers(db);
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    it("should LOGIN user successful", async () => {
        const res = await  request
            .post('/api/users/login')
            .send({
            code: "se000000",
            password: "123456789"
        })
            cookie = await res.headers['set-cookie'][0];
            expect(res.status).toEqual(200);
    })

    it("should CHANGE PASSWORD successful", async () => {
        const res = await request 
            .put('/api/users/se000000/passwords')
            .set("cookie", cookie)
            .send({
                password: "123456789",
                newPassword: "000000000",
                confirm: "000000000"
            })
        expect(res.status).toEqual(200);
    })

    it("should CHANGE PASSWORD invalid input", async () => {
        const res = await request 
            .put('/api/users/se000000/passwords')
            .set("cookie", cookie)
            .send({
                password: "123456789",
                newPassword: "#@000000000",
                confirm: "#@000000000"
            })
        expect(res.status).toEqual(400);
    })

    it("should CHANGE PASSWORD invalid input", async () => {
        const res = await request 
            .put('/api/users/se000000/passwords')
            .set("cookie", cookie)
            .send({
                password: "00",
                newPassword: "000000000",
                confirm: "000000000"
            })
        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"password" length must be at least 5 characters long');
    })

    it("should CHANGE PASSWORD invalid input", async () => {
        const res = await request 
            .put('/api/users/se000000/passwords')
            .set("cookie", cookie)
            .send({
                password: "123456789",
                newPassword: "000000000",
                confirm: "111111111"
            })
        expect(res.status).toEqual(400);
    })

    it("should CHANGE PASSWORD invalid input", async () => {
        const res = await request 
            .put('/api/users/se000000/passwords')
            .set("cookie", cookie)
            .send({
                password: "123456789",
                newPassword: "0",
                confirm: "0"
            })
        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"newPassword" length must be at least 5 characters long');
    })

    it("should CHANGE PASSWORD unauthorized", async () => {
        const res = await request 
            .put('/api/users/se000000/passwords')
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