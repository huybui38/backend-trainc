const {request, cleanup, setupDatabase, createUsers, getCookie, createCourse} = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;
let name, password, course;

describe('Create Group /groups', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('create_group');
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
        .post('/api/groups/')
        .set('cookie', cookie)
        .send({
            name: name,
            password: password,
            course: course
    })}

    it("should return 200 CREATE GROUP successful", async () => {
        cookie = cookieAdmin;
        name = 'project c';
        password = '123456789';
        course = "learning c";

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toMatch("Group was created successfully.");
    })

    
    it("should return 400 CREATE GROUP failed: 'name' empty", async () => {
        cookie = cookieAdmin;
        name = '';
        password = '123456789';
        course = "learning c";

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"name" is not allowed to be empty');
    })

    it("should return 400 CREATE GROUP failed: 'name' is more than 255 characters long", async () => {
        cookie = cookieAdmin;
        name = new Array(260).join('a');
        password = '123456789';
        course = "learning c";

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"name" length must be less than or equal to 255 characters long');
    })

    it("should return 400 CREATE GROUP failed: 'password' is less than 5 characters long", async () => {
        cookie = cookieAdmin;
        name = 'project C';
        password = '1';
        course = "learning c";

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"password" length must be at least 5 characters long')
    })

    it("should return 400 CREATE GROUP failed: 'password' is more than 255 characters long", async () => {
        cookie = cookieAdmin;
        name = 'project C';
        password = new Array(260).join('0');
        course = "learning c";

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"password" length must be less than or equal to 255 characters long')
    })

    it("should return 400 CREATE GROUP failed: 'password' has special charaters", async () => {
        cookie = cookieAdmin;
        name = 'project c';
        password = '#123456@';
        course = 'learning c';

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 400 CREATE GROUP failed: 'course' empty", async () => {
        cookie = cookieAdmin;
        name = 'project c';
        password = '123456789';
        course = '';

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"course" is not allowed to be empty');
    })

    
    it("should return 400 CREATE GROUP failed: 'course' is more than 255 characters long", async () => {
        cookie = cookieAdmin;
        name = 'project c';
        password = '123456789';
        course = new Array(260).join('a');

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"course" length must be less than or equal to 255 characters long');
    })

    it("should return 403 CREATE GROUP failed: isAdmin false", async () => {
        cookie = cookieStudent;
        name = 'project c';
        password = '123456789';
        course = 'learning c';

        const res = await exec();

        expect(res.status).toEqual(403);
        expect(res.body.message).toMatch('Forbidden.');
    })

    it("should return 404 CREATE GROUP failed: 'course' not found", async () => {
        cookie = cookieAdmin;
        name = 'project java';
        password = '123456789';
        course = 'learning java';

        const res = await exec();

        expect(res.status).toEqual(401);
        expect(res.body.message).toMatch('Course is not correct.');
    })

});