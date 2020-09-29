const {request, cleanup, setupDatabase, getCookie} = require('../../helpers');
const { createUsers, createCourse } = require('../../createDbTesting');
const { Course } = require('../../../models/Course.model');
let cookieAdmin, cookieStudent, cookie;
let name, active, nameCourse;

describe('Update courses /:name', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('update_course');
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
            .put(`/api/courses/${idCourse}`)
            .set('cookie', cookie)
            .send({ name, active })
    }

    it("should return 401 UPDATE COURSES failed: 'name' is more than 255 characters long", async () => {
        cookie = cookieAdmin;
        const course = await Course.findOne({ name: "learning c"});
        idCourse = course._id;
        name = new Array(260).join('a');
        active = true;

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 401 UPDATE COURSES failed: 'name' empty", async () => {
        cookie = cookieAdmin;
        const course = await Course.findOne({ name: "learning c"});
        idCourse = course._id;
        name = "";
        active = true;

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 404 UPDATE COURSES failed: Not found course", async () => {
        cookie = cookieAdmin;
        idCourse = "";
        name = 'learning java';
        active = true;

        const res = await exec();

        expect(res.status).toEqual(404);
    })

    it("should return 200 UPDATE COURSES successful", async () => {
        cookie = cookieAdmin;
        const course = await Course.findOne({ name: "learning c"});
        idCourse = course._id;
        name = 'learning java';
        active = true;

        const res = await exec();

        expect(res.status).toEqual(200);
    })

})