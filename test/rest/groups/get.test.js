const {request, cleanup, setupDatabase, createUsers, getCookie, createCourse, createGroup} = require('../../helpers');
const { Group } = require('../../../models/Group.model');
let cookieAdmin, cookieStudent, cookie;
let idGroup;

describe('Get Group /groups/:id', () => {
    let db;
    beforeAll(async()=>{
        db = await setupDatabase('get_group');
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
        .get(`/api/groups/${idGroup}`)
        .set('cookie', cookie)
    }

    it("should return 200 GET GROUP: successful", async () => {
        cookie = cookieStudent;
        const group = await Group.findOne({name: 'project c'});
        idGroup = group._id;

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("members");
        expect(res.body).toHaveProperty("exercises");
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("name", "project c");
        expect(res.body).toHaveProperty("course", "learning c");
    })
})