const {request, cleanup, setupDatabase, createUsers, getCookie, createCourse} = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;

describe('Get all courses /', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('getAll_course');
        await createUsers(db);
        await createCourse(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    const exec = async  () => {
        return await request
            .get('/api/courses/')
            .set('cookie', cookie);
    }

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