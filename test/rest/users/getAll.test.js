const {request,init,cleanup, initDatabase, createAdmin} = require('../../helpers');
const { getAllUsers } = require('../../data');
var cookie;

describe('Get all users /', () => {
	init();

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

    it('should GET ALL users successfully', async () => {
        const res = await request
        .get('/api/users/')
        .set('cookie', cookie)
        const users =  getAllUsers();
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject(users);
    })
    
})