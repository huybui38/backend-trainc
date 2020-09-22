const {request, cleanup, setupDatabase, createUsers} = require('../../helpers');
const { getAllUsers } = require('../../data');
var cookieAdmin, cookieStudent;

describe('Get all users /', () => {
    beforeAll(async()=>{
        db = await setupDatabase('getAll_user');
        await createUsers(db);
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    it("should LOGIN admin successful", async () => {
        const res = await  request
        .post('/api/users/login')
        .send({
            code: "admin123",
            password: "123456789"
        })
        cookieAdmin = await res.headers['set-cookie'][0];
        expect(res.status).toEqual(200);
    })

    it("should LOGIN student successful", async () => {
        const res = await  request
            .post('/api/users/login')
            .send({
            code: "se000000",
            password: "123456789"
        })
            cookieStudent = await res.headers['set-cookie'][0];
            expect(res.status).toEqual(200);
    })

    it('should GET ALL users successfully', async () => {
        const res = await request
        .get('/api/users/')
        .set('cookie', cookieAdmin)
        const users =  getAllUsers();
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject(users);
    })

    it('should GET ALL users failed with forbidden', async () => {
        const res = await request
        .get('/api/users/')
        .set('cookie', cookieStudent)
        const users =  getAllUsers();
        expect(res.status).toEqual(403);
        expect(res.body.message).toMatch("Forbidden.");
    })

    it('should GET ALL users failed with not found', async () => {
        const res = await request
        .get('/api/users/failed')
        .set('cookie', cookieAdmin)
        const users =  getAllUsers();
        expect(res.status).toEqual(404);
        expect(res.body.message).toMatch("Not found");
    })
    
})