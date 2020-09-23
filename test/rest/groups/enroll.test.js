const {request, cleanup, setupDatabase, createUsers, getCookie, createCourse, createGroup} = require('../../helpers');
const { Group } = require('../../../models/Group.model');
let cookieAdmin, cookieStudent, cookie;
let password, idGroup;

describe('Enroll Group /groups/:id', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('enroll_group');
        await createUsers(db);
        await createCourse(db);
        await createGroup(db);
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
    });
    
    const exec = async () => {
        return await request
        .post(`/api/groups/${idGroup}`)
        .set('cookie', cookie)
        .send({ password : password})
    }

    it("should return 400 ENROLL GROUP failed: 'password' is less than 5 charaters long", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        password = '1';

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('"password" length must be at least 5 characters long');
    })

    it("should return 400 ENROLL GROUP failed: 'password' is more than 255 charaters long", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        password = new Array(260).join('1');

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('"password" length must be less than or equal to 255 characters long');
    })

    it("should return 400 ENROLL GROUP failed: 'password' has special charaters", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        password = '#123456789@';

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 401 ENROLL GROUP failed: 'password' isn't correct", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        password = '12345678910';

        const res = await exec();

        expect(res.status).toEqual(401);
        expect(res.body.message).toEqual('Password is not correct.');
    })

    it("should return 400 ENROLL GROUP failed: 'code' have already enrolled", async () => {
        cookie = cookieStudent;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        password = '123456789';

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('You have already enrolled.');
    })

    
    it("should return 200 ENROLL GROUP: successful", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        password = '123456789';

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toEqual('Enroll success.');
    })

});