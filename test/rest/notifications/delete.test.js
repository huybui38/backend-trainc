const {request, cleanup, setupDatabase} = require('../../helpers');
const {  createUsers, getCookie, createCourse, createNotification } = require('../../helpers');
const { Notification } = require('../../../models/Notification.model')
const { Course } = require('../../../models/Course.model');

let cookieAdmin, cookieStudent, cookie;
let idNotification;

describe('Delete notification: /notifications/:id', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase("delete_notification");
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
        .delete(`/api/notifications/${idNotification}`)
        .set('cookie', cookie)
    }

    it("should return 403 DELETE NOTIFICATION failed: isAdmin false", async () => {
        cookie = cookieStudent;
        const notification = await Notification.findOne({ content: "Homework: 04/02"})
        idNotification = notification._id;

        const res = await exec();

        expect(res.status).toEqual(403);
    })

    it("should return 404 DELETE NOTIFICATION failed: notification not found", async () => {
        cookie = cookieAdmin;
        idNotification = "";

        const res = await exec();

        expect(res.status).toEqual(404);
    })

    it("should return 200 DELETE NOTIFICATION: successful", async () => {
        cookie = cookieAdmin;
        const notification = await Notification.findOne({ content: "Homework: 04/02"})
        idNotification = notification._id;

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toEqual("Notification was deleted successfully.")
    })

    it("should return 200 DELETE NOTIFICATION: must match", async () => {
        const course = await Course.findOne({ name: "learning c" });
        const res = await request
            .get(`/api/courses/${course._id}/notifications`)
            .set('cookie', cookieAdmin)

        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(0);
    })

});