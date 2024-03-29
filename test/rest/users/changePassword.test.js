const {request, cleanup, setupDatabase, getCookie} = require('../../helpers');
const { createUsers } = require('../../createDbTesting');
let cookieAdmin, cookieStudent, cookie;
let password, newPassword, confirm;

describe('Change password user /:code/password', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('change_password_user');
        await createUsers(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });
    const exec = async () => {
        return await request
        .put('/api/users/se000000/passwords')
        .set("cookie", cookie)
        .send({ password, newPassword, confirm })
    }

    it("should return 200 CHANGE successful", async () => {
        cookie = cookieStudent;
        password = "123456789";
        newPassword = "000000000";
        confirm = "000000000";

        const res = await exec(); 
        expect(res.status).toEqual(200);
    })

    it("should return 400 CHANGE failed: 'newPassword' have special characters", async () => {
        cookie = cookieStudent;
        password = "123456789";
        newPassword = "#000000000@";
        confirm = "#000000000@";

        const res = await exec(); 
        expect(res.status).toEqual(400);
    })

    it("should return 400 CHANGE failed: 'password' is less than 8 characters long", async () => {
        cookie = cookieStudent;
        password = "1";
        newPassword = "000000000";
        confirm = "000000000";

        const res = await exec(); 
        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"password" length must be at least 8 characters long');
    })

    it("should return 400 CHANGE PASSWORD failed: 'confirm' don't match 'newPassword'", async () => {
        cookie = cookieStudent;
        password = "123456789";
        newPassword = "000000000";
        confirm = "111111111";

        const res = await exec(); 
        expect(res.status).toEqual(400);
    })

    it("should return 400 CHANGE PASSWORD failed: 'newPassword' less than 8 characters long", async () => {
        cookie = cookieStudent;
        password = "123456789";
        newPassword = "0";
        confirm = "0";

        const res = await exec(); 
        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch('"newPassword" length must be at least 8 characters long');
    })

    it("should return 401 CHANGE PASSWORD failed: 'password' isn't correct", async () => {
        cookie = cookieStudent;
        password = "12345678910";
        newPassword = "000000000";
        confirm = "000000000";

        const res = await exec(); 
        expect(res.status).toEqual(401);
        expect(res.body.message).toMatch('Password is not correct');
    })

})