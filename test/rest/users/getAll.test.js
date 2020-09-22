const {request, cleanup, setupDatabase, createUsers, getCookie} = require('../../helpers');
const { getAllUsers } = require('../../data');
let cookieAdmin, cookieStudent, cookie;

describe('Get all users /', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('getAll_user');
        await createUsers(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    const exec = async () => {
        return await request
        .get('/api/users/')
        .set('cookie', cookie)
    }

    it('should return 200 GET ALL successful', async () => {
        cookie = cookieAdmin;

        const res = await exec();

        const users =  getAllUsers();
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject(users);
    })

    it('should return GET ALL failed: isAdmin false', async () => {
        cookie = cookieStudent;

        const res = await exec();

        expect(res.status).toEqual(403);
        expect(res.body.message).toMatch("Forbidden.");
    })
})