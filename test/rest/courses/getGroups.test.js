const {request, cleanup, setupDatabase, getCookie} = require('../../helpers');
const { createUsers, createCourse } = require('../../createDbTesting');
const { Course } = require('../../../models/Course.model');

let cookieAdmin, cookieStudent ,cookie;
let idCourse;

describe('Create courses /', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('getGroups_course');
        await createUsers(db);
        await createCourse(db);
        cookieAdmin = await getCookie('admin123');
        cookieStudent = await getCookie('se000000');
        const res = await request
            .post('/api/groups/')
            .set('cookie', cookieAdmin)
            .send({name: "Project C", password: "123456789", "course": "Learning C"})
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    const exec = async  () => {
        return await request
            .get(`/api/courses/${idCourse}/groups`)
            .set('cookie', cookie)
    }

    it("should return 200 GET GROUPS successful with Student", async () => {
        const course = await Course.findOne({ name: 'learning c' });
        idCourse = course._id;
        cookie = cookieAdmin;

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty("members");
        expect(res.body[0]).toHaveProperty("exercises");
        expect(res.body[0]).toHaveProperty("_id")
        expect(res.body[0]).toHaveProperty("name")
        expect(res.body[0]).toHaveProperty("password")
        expect(res.body[0]).toHaveProperty("course")
    })

    
    it("should return 200 GET GROUPS successful with Admin", async () => {
        const course = await Course.findOne({ name: 'learning c' });
        idCourse = course._id;
        cookie = cookieStudent;

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty("members");
        expect(res.body[0]).toHaveProperty("exercises");
        expect(res.body[0]).toHaveProperty("_id")
        expect(res.body[0]).toHaveProperty("name")
        expect(res.body[0]).toHaveProperty("password")
        expect(res.body[0]).toHaveProperty("course")
    })
})