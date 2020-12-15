const {request, cleanup, setupDatabase, getCookie} = require('../../helpers');
const { createUsers, createCourse, createNotification } = require('../../createDbTesting');
const { Notification } = require('../../../models/Notification.model')
const { Course } = require('../../../models/Course.model');

let cookieStudent, cookie;
let idCourse;

describe('Get notifications of course: courses/:id_course/notifications', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase("get_notification");
        await createUsers(db);
        await createCourse(db);
        await createNotification(db);
        cookieStudent = await getCookie('se000000');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });
    
    const exec = async () => {
        return await request
        .get(`/api/courses/${idCourse}/notifications`)
        .set('cookie', cookieStudent)
    }

    it("should return 200 GET NOTIFICATION: successful", async () => {
        const course = await Course.findOne({ name: "learning c"});
        idCourse = course._id;

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty("content", "Homework: 04/02");
        expect(res.body[0]).toHaveProperty("course", "learning c");
    })

});