const {request, cleanup, setupDatabase, createUsers, getCookie} = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;
let code, role, active;

describe('Update users /', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('update_user');
        await createUsers(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

    const exec = async () => {
        return await request
        .put('/api/users/')
        .set('cookie', cookie)
        .send({
            code: code,
            role: role,
            active: active
        })
    }     

    it("should return UPDATE USER successful", async () => {
        cookie = cookieAdmin;
        code = "se000000";
        role = "0";
        active = true;

        const res = await exec();

        expect(res.status).toEqual(200);
    })

    it("should return 400 UPDATE USER failed: 'code' is less then 8 characters long", async () => {
        cookie = cookieAdmin;
        code = "se000";
        role = "0";
        active = true;

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 400 UPDATE USER failed: 'rule' is bigger than [0,1]", async () => {
        cookie = cookieAdmin;
        code = "se000000";
        role = "2";
        active = true;

        const res = await exec();
        expect(res.status).toEqual(400);
    })

    it("should return 401 UPDATE USER failed: 'code' isn't correct", async () => {
        cookie = cookieAdmin;
        code = "se111111";
        role = "0";
        active = true;

        const res = await exec();
        expect(res.status).toEqual(401);
    })

});