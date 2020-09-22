const {request,init, getCookie} = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;

describe('Create courses /', () => {
    const exec = async  () => {
        return await request
            .get('/api/courses/')
            .set('cookie', cookie);
    }

    init();
    beforeEach( async () => {
        cookieAdmin = await getCookie('admin123');
        cookieStudent =await getCookie('se000000')
    })

    it("should return 200 when GET list courses success with Admin", async () => {
        cookie = cookieAdmin;
        const res= await exec();
      
        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty('active');
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('createdTime');
        expect(res.body[0]).toHaveProperty('name');
    })

    it("should return 200 when GET list courses success with Student", async () => {
        cookie = cookieStudent;
        const res= await exec()

        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty('active');
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('createdTime');
        expect(res.body[0]).toHaveProperty('name');
    })

})