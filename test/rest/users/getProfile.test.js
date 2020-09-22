const {request, cleanup, setupDatabase, createUsers} = require('../../helpers');
const { getProfile } = require('../../data');
var cookie;

describe('Get profile: /:code/names', () => {
    beforeAll(async()=>{
        db = await setupDatabase('getProfile_test');
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
   
    it('should GET PROFILE successful', async () => {
        const res = await request
            .get('/api/users/se000000')
            .set('cookie', cookie)
        
        const profile = getProfile();
        console.log(typeof profile);
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject(profile);
    })

    it('should GET PROFILE failed', async () => {
        const res = await request
            .get('/api/users/se111111')
            .set('cookie', cookie)

        expect(res.status).toEqual(404);
        expect(res.body.message).toMatch('Not found.')
    })
})