const {request, cleanup, setupDatabase, createUsers, getCookie, createCourse} = require('../../helpers');
const { Course } = require('../../../models/Course.model'); 
let cookieAdmin, cookieStudent, cookie;
let idCourse

describe('Delete courses /', () => {
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
            .delete(`/api/courses/${idCourse}`)
            .set('cookie', cookie)
    }

    it("should return 403 DELETE COURSE failed: isAdmin false", async () => {
        const course = await Course.findOne({ name: "learning c"});
        idCourse = course._id;
        cookie = cookieStudent;

        const res = await exec();

        expect(res.status).toEqual(403);
    })

    it("should return 404 DELETE COURSE failed: Not found course", async () => {
        idCourse = "";
        cookie = cookieAdmin;

        const res = await exec();

        expect(res.status).toEqual(404);
    })

    it("should return 200 DELETE COURSE successful", async () => {
        const course = await Course.findOne({ name: "learning c"});
        idCourse = course._id;
        cookie = cookieAdmin;

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toMatch("Course was deleted successfully.")
    })

})