const {request, cleanup, setupDatabase, getCookie} = require('../../helpers');
const { createUsers } = require('../../createDbTesting');
let cookieAdmin, cookieStudent, cookie;

describe('Get profile: /:code/names', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('getProfile_test');
        await createUsers(db);
        cookieStudent = await getCookie('se000000');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    const exec = async () => {
        return await request
        .get('/api/users/se000000')
        .set('cookie', cookie)
    }

    it('should return 200 GET PROFILE successful', async () => {
        cookie = cookieStudent;

        const res = await exec();
        
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("code");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("role");
    })
})