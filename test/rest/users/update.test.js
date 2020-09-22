const {request, cleanup, setupDatabase, createUsers} = require('../../helpers');
var cookie;

describe('Update users /', () => {
    beforeAll(async()=>{
        db = await setupDatabase('update_user');
        await createUsers(db);
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    it("should LOGIN user successful", async () => {
        const res = await  request
        .post('/api/users/login')
        .send({
            code: "admin123",
            password: "123456789"
        })
        cookie = await res.headers['set-cookie'][0];
        expect(res.status).toEqual(200);
    })

    it("should UPDATE USER successful", async () => {
        const res = await request
        .put('/api/users/')
        .set('cookie', cookie)
        .send({
            code: "se000000",
            role: "0",
            active: true
        })
        expect(res.status).toEqual(200);
    })

    it("should UPDATE USER failed", async () => {
        const res = await request
        .put('/api/users/')
        .set('cookie', cookie)
        .send({
            code: "se000",
            role: "0",
            active: true
        })
        expect(res.status).toEqual(400);
    })

    it("should UPDATE USER failed", async () => {
        const res = await request
        .put('/api/users/')
        .set('cookie', cookie)
        .send({
            code: "se000000",
            role: "2",
            active: true
        })
        expect(res.status).toEqual(400);
    })

    it("should UPDATE USER failed", async () => {
        const res = await request
        .put('/api/users/')
        .set('cookie', cookie)
        .send({
            code: "se111111",
            role: "0",
            active: true
        })
        expect(res.status).toEqual(401);
    })

});