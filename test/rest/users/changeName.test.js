const {request,init,cleanup, initDatabase, createAdmin} = require('../../helpers');
var cookie;

describe('Change user name: /:code/names', () => {
    init();

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

    it("should change user name successful", async () => {
        const res = await request
            .put('/api/users/se000000/names')
            .set('cookie', cookie)
            .send({
                password: "123456789",
                name: "Test change name"
            })
        expect(res.status).toEqual(200);
        expect(res.text).toMatch("Name was changed successfully.");
    })

    it("should change user name with invalid input", async () => {
        const res = await request
            .put('/api/users/se000000/names')
            .set('cookie', cookie)
            .send({
                password: "123456789",
                name: ""
            })
        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"name" is not allowed to be empty');
    })

       it("should change user name with invalid input", async () => {
        const res = await request
            .put('/api/users/se000000/names')
            .set('cookie', cookie)
            .send({
                password: "@@@@@@",
                name: "Test change name"
            })
        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"password" with value "@@@@@@" fails to match the required pattern: /^[a-zA-Z0-9]/');
    })

        it("should change user name with invalid input", async () => {
        const res = await request
            .put('/api/users/se000000/names')
            .set('cookie', cookie)
            .send({
                password: "123456789",
                name: "Test @@@"
            })
        expect(res.status).toEqual(400);
        console.log(res.body);
        expect(res.body.message).toMatch('"name" is not allowed to be empty');
    })

    it("should change user name with unauthorized", async () => {
        const res = await request
            .put('/api/users/se000000/names')
            .set('cookie', cookie)
            .send({
                password: "000000000",
                name: "Test change name"
            })
        expect(res.status).toEqual(401);
        expect(res.body.message).toMatch('Password is not correct.');
    })
})