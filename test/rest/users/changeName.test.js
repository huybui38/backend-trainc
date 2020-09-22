const {request, cleanup, setupDatabase, createUsers, getCookie} = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;
let password, name;

describe('Change user name: /:code/names', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('change_name_user');
        await createUsers(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    const exec = async () => {
        return await request
        .put('/api/users/se000000/names')
        .set('cookie', cookie)
        .send({
            password: password,
            name: name
    })}

    it("should return 200 CHANGE NAME successful", async () => {
        cookie = cookieStudent;
        password = "123456789";
        name = "Test change name";
      
        const res = await exec();
        expect(res.status).toEqual(200);
        expect(res.text).toMatch("Name was changed successfully.");
    })

    it("should return 400 CHANGE NAME: 'name' empty", async () => {
        cookie = cookieStudent;
        password = "123456789";
        name = "";
      
        const res = await exec();
        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"name" is not allowed to be empty');
    })

    it("should return 400 CHANGE NAME: 'name' is more than 255 characters long", async () => {
        cookie = cookieStudent;
        password = "123456789";
        name = new Array(260).join('a');
      
        const res = await exec();
        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"name" length must be less than or equal to 255 characters long');
    })

    it("should return 400 CHANGE NAME failed: 'password' have special characters", async () => {
        cookie = cookieStudent;
        password = "@123456789#";
        name = "Test change name";
      
        const res = await exec();
        expect(res.status).toEqual(400);
    })

    it("should return 400 CHANGE NAME failed: 'name' have special characters", async () => {
        cookie = cookieStudent;
        password = "123456789";
        name = "Test change name @@";
      
        const res = await exec();
        expect(res.status).toEqual(400);
    })

    it("should return 401 CHANGE NAME failed: 'password' isn't correct", async () => {
        cookie = cookieStudent;
        password = "987654321";
        name = "Test change name";
      
        const res = await exec();
        expect(res.status).toEqual(401);
        expect(res.body.message).toMatch('Password is not correct.');
    })
})