const {request, cleanup, setupDatabase, createUsers, getCookie, createCourse, createGroup} = require('../../helpers');
const { Group } = require('../../../models/Group.model');
let cookieAdmin, cookieStudent, cookie;
let code, idGroup;

describe('Kick Member Group /groups/:id/members', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('delete_group');
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
        .delete(`/api/groups/${idGroup}/members`)
        .set('cookie', cookie)
        .send({ code : code})
    }

    it("should return 400 KICK MEMBER failed: 'code' has special characters", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({name: "project c"});
        idGroup = group._id;
        code = '#s000000';

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('"code" must only contain alpha-numeric characters')
    })

    it("should return 400 KICK MEMBER failed: 'code' is more than 8 characters long", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({name: "project c"});
        idGroup = group._id;
        code = new Array(10).join(0);

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('"code" length must be less than or equal to 8 characters long')
    })

    
    it("should return 400 KICK MEMBER failed: 'code' empty", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({name: "project c"});
        idGroup = group._id;
        code = '';

        const res = await exec();

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('"code" is not allowed to be empty')
    })

    it("should return 401 KICK MEMBER failed: 'code' not found", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({name: "project c"});
        idGroup = group._id;
        code = 'se222222';

        const res = await exec();

        expect(res.status).toEqual(401);
        expect(res.body.message).toEqual('Member is not correct.')
    })


    it("should return 403 KICK MEMBER failed: isAdmin false", async () => {
        cookie = cookieStudent;
        const group = await Group.findOne({name: "project c"});
        idGroup = group._id;
        code = 'se111111';

        const res = await exec();

        expect(res.status).toEqual(403);
        expect(res.body.message).toEqual('Forbidden.')
    })

    it("should return 200 KICK MEMBER: successful", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({name: "project c"});
        idGroup = group._id;
        code = 'se111111';

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toEqual('Member was deleted successfully.')
    })
});
