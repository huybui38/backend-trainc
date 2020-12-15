const {request, cleanup, setupDatabase, getCookie} = require('../../helpers');
const { createUsers } = require('../../createDbTesting');
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

        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty("active");
        expect(res.body[0]).toHaveProperty("code");
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("role");
        expect(res.body[0]).toHaveProperty("_id");
    })

    it('should return GET ALL failed: isAdmin false', async () => {
        cookie = cookieStudent;

        const res = await exec();

        expect(res.status).toEqual(403);
        expect(res.body.message).toMatch("Forbidden.");
    })
})