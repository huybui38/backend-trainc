const {request, cleanup, setupDatabase, createUsers, getCookie} = require('../../helpers');
const { getProfile } = require('../../data');
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
        
        const profile = getProfile();
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject(profile);
    })
})