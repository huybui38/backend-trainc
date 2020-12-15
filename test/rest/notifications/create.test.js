const {request, cleanup, setupDatabase, getCookie} = require('../../helpers');
const { createUsers, createCourse } = require('../../createDbTesting');
const { Group } = require('../../../models/Group.model');
let cookieAdmin, cookieStudent, cookie;
let course, content;

describe('Create notification: /notifications/', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase("create_notification");
        await createUsers(db);
        await createCourse(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });
    
    const exec = async () => {
        return await request
        .post('/api/notifications/')
        .set('cookie', cookie)
        .send({ course, content })
    }

    it("should return 200 CREATE NOTIFICAtION: successful", async () => {
        cookie = cookieAdmin;
        course = "Learning C"
        content = "Deadline project: 4/2/2021"

        const res = await exec();
        expect(res.status).toEqual(200);
    })

    it("should return 400 CREATE NOTIFICAtION failed: 'course' empty", async () => {
        cookie = cookieAdmin;
        course = ""
        content = "Deadline project: 4/2/2021"

        const res = await exec();
        expect(res.status).toEqual(400);
    })

    
    it("should return 400 CREATE NOTIFICAtION failed: 'course' is more than 255 characters long", async () => {
        cookie = cookieAdmin;
        course = new Array(260).join('a');
        content = "Deadline project: 4/2/2021"

        const res = await exec();
        expect(res.status).toEqual(400);
    })

    it("should return 400 CREATE NOTIFICAtION failed: 'content' empty", async () => {
        cookie = cookieAdmin;
        course = 'Learning C';
        content = ""

        const res = await exec();
        expect(res.status).toEqual(400);
    })

    it("should return 400 CREATE NOTIFICAtION failed: 'content' is more than 2000 characters long", async () => {
        cookie = cookieAdmin;
        course = 'Learning C';
        content = new Array(2007).join('a');

        const res = await exec();
        expect(res.status).toEqual(400);
    })

    it("should return 401 EATE NOTIFICAtION failed: 'course' not found", async () => {
        cookie = cookieAdmin;
        course = 'Learning Java';
        content = "Deadline project: 4/2/2021"

        const res = await exec();
        expect(res.status).toEqual(401);
    })

    it("should return 403 EATE NOTIFICAtION failed: isAdmin not found", async () => {
        cookie = cookieStudent;
        course = 'Learning C';
        content = "Deadline project: 4/2/2021"

        const res = await exec();
        expect(res.status).toEqual(403);
    })

})