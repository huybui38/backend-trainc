const {request, cleanup, setupDatabase} = require('../../helpers');
const {  createUsers, getCookie, createCourse, createNotification } = require('../../helpers');
const { Notification } = require('../../../models/Notification.model')
const { Course } = require('../../../models/Course.model');

let cookieAdmin, cookieStudent, cookie;
let course, content, idNotification;

describe('Update notification: /notifications/:id', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase("update_notification");
        await createUsers(db);
        await createCourse(db);
        await createNotification(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });
    
    const exec = async () => {
        return await request
        .put(`/api/notifications/${idNotification}`)
        .set('cookie', cookie)
        .send({ course, content })
    }

        it("should return 400 UPDATE NOTIFICATION failed: 'content' empty", async () => {
            cookie = cookieAdmin;
            const notification = Notification.findOne({content: "Homework: 04/02"});
            idNotification = notification._id;
            content = "";
            course = "learning python"

            const res = await exec();
            expect(res.status).toEqual(400);
        })

        it("should return 400 UPDATE NOTIFICATION failed: 'content' is more than 2000 characters long", async () => {
            cookie = cookieAdmin;
            const notification = Notification.findOne({content: "Homework: 04/02"});
            idNotification = notification._id;
            content = new Array(2007).join('a');
            course = "learning python"

            const res = await exec();
            expect(res.status).toEqual(400);
        })

        it("should return 400 UPDATE NOTIFICATION failed: 'course' empty", async () => {
            cookie = cookieAdmin;
            const notification = Notification.findOne({content: "Homework: 04/02"});
            idNotification = notification._id;
            content = "Dealine homework: 05/02";
            course = ""

            const res = await exec();
            expect(res.status).toEqual(400);
        })

        it("should return 400 UPDATE NOTIFICATION failed: 'course' is more than 255 characters long", async () => {
            cookie = cookieAdmin;
            const notification = Notification.findOne({content: "Homework: 04/02"});
            idNotification = notification._id;
            content = new Array(260).join('a');
            course = "learning python"

            const res = await exec();
            expect(res.status).toEqual(400);
        })

        it("should return 401 UPDATE NOTIFICATION failed: 'course' not found", async () => {
            cookie = cookieAdmin;
            const notification = await Notification.findOne({content: "Homework: 04/02"});
            idNotification = notification._id;
            content = "Deadline homework: 05/02";
            course = "learning java"

            const res = await exec();
            expect(res.status).toEqual(401);
        })

        it("should return 403 UPDATE NOTIFICATION failed: isAdmin false", async () => {
            cookie = cookieStudent;
            const notification = Notification.findOne({content: "Homework: 04/02"});
            idNotification = notification._id;
            content = "Deadline homework: 05/02";
            course = "learning python"

            const res = await exec();
            expect(res.status).toEqual(403);
        })

        it("should return 404 UPDATE NOTIFICATION failed: Notification not found", async () => {
            cookie = cookieAdmin;
            idNotification = "";
            content = "Deadline homework: 05/02";
            course = "learning python"

            const res = await exec();
            expect(res.status).toEqual(404);
        })

        it("should return 200 UPDATE NOTIFICATION: successful", async () => {
            cookie = cookieAdmin;
            const notification = await Notification.findOne({content: "Homework: 04/02"});
            idNotification = notification._id;
            content = "Change deadline successful!";
            course = "learning python"

            const res = await exec();
            expect(res.status).toEqual(200);
            expect(res.text).toEqual("Notification was updated successfully.");
        })

        it("should return 200 UPDATE NOTIFICATION: must match", async () => {
            const course = await Course.findOne({ name: "learning python" });
            const res = await request
                .get(`/api/courses/${course._id}/notifications`)
                .set('cookie', cookieAdmin)

            expect(res.status).toEqual(200);
            expect(res.body[0]).toHaveProperty("content", "Change deadline successful!");
            expect(res.body[0]).toHaveProperty("course", "learning python");
        })
})