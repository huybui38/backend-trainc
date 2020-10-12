const { request, cleanup, setupDatabase, getCookie } = require("../../helpers");
const { createUsers, createCourse, createGroup } = require("../../createDbTesting");
const { Group } = require("../../../models/Group.model");

describe("Get Group /groups/:id", () => {
    let cookie;
    let db;
    let group;

    beforeAll(async () => {
        db = await setupDatabase("get_group");
        await createUsers(db);
        await createCourse(db);
        await createGroup(db);
        cookie = await getCookie("se000000");
        group = await Group.findOne({ name: "project c" });
    });

    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async ({ idGroup, cookie }) => {
        return await request.get(`/api/groups/${idGroup}`).set("cookie", cookie);
    };

    it("GET GROUP failed: Not found", async () => {
        const res = await exec({ idGroup: group.course, cookie });
        expect(res.status).toBe(404);
        expect(res.body.message).toBeDefined();
    });

    it("GET GROUP succeeded", async () => {
        const res = await exec({ idGroup: group._id, cookie });

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });
});
