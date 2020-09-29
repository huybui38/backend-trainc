const {request, cleanup, setupDatabase, getCookie} = require('../../helpers');
const { createUsers } = require('../../createDbTesting');
let cookieAdmin, cookieStudent, cookie;
let name, thumbnail;

describe('Create courses /', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('create_course');
        await createUsers(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });
    
    const exec = async () => {
        return await request
        .post('/api/courses/')
        .set('cookie', cookie)
        .send({ name, thumbnail})
    }

    it("should return 200 when CREATE successful", async () => {
        cookie = cookieAdmin;
        name = "Learning Java";
        thumbnail = "test";
        
        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toMatch("Course was created successfully.")
    })

    it("should return 400 when CREATE failed with: 'name' empty", async () => {
        cookie = cookieAdmin;
        name = "";
        thumbnail = "test";

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 400 when CREATE failed with: 'name' has special characters" , async () => {
        cookie = cookieAdmin;
        name = "#Learning C#";
        thumbnail = "test";

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 403 when CREATE failed with: isAdmin false", async () => {
        cookie = cookieStudent;
        name = "Learning C";
        thumbnail = "test";

        const res = await exec();

        expect(res.status).toEqual(403);
    })

})