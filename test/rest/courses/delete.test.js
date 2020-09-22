const {request, cleanup, setupDatabase, createUsers, getCookie, createCourse} = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;
let nameCourse

describe('Create courses /', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('delete_course');
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
            .delete(`/api/courses/${nameCourse}`)
            .set('cookie', cookie)
            .send({name: nameCourse})
    }

    it("should return 403 DELETE COURSE failed: isAdmin false", async () => {
        nameCourse = 'learning c';
        cookie = cookieStudent;

        const res = await exec();

        expect(res.status).toEqual(403);
    })

    it("should return 404 DELETE COURSE failed: Not found course", async () => {
        nameCourse = 'learning java';
        cookie = cookieAdmin;

        const res = await exec();

        expect(res.status).toEqual(404);
    })

    it("should return 200 DELETE COURSE successful", async () => {
        nameCourse = 'learning c';
        cookie = cookieAdmin;

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toMatch("Course was deleted successfully.")
    })

})