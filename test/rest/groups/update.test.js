const { request, cleanup, setupDatabase, getCookie } = require("../../helpers");
const { createUsers, createCourse, createGroup } = require("../../createDbTesting");
const { Group } = require("../../../models/Group.model");

describe("Update Group /groups/:id", () => {
    let db;
    let cookie;
    let name, active, group;

    beforeAll(async () => {
        db = await setupDatabase("update_group");
        await createUsers(db);
        await createCourse(db);
        await createGroup(db);
        group = await Group.findOne({ name: "project c" });
    });

    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async ({ idGroup, cookie, name, active }) => {
        return await request.put(`/api/groups/${idGroup}`).set("cookie", cookie).send({ name, active });
    };

    describe("with student cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("se000000");
        });

        beforeEach(async () => {
            name = "change name";
            active = !group.active;
        });

        it("UPDATE GROUP failed: isAdmin false", async () => {
            const res = await exec({ idGroup: group._id, cookie, name, active });
            expect(res.status).toBe(403);
            expect(res.body.message).toBeDefined();
        });
    });

    describe("with admin cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("admin123");
        });

        beforeEach(async () => {
            name = "change name";
            active = !group.active;
        });

        it("UPDATE GROUP failed: Not found", async () => {
            const res = await exec({ idGroup: group.course, cookie, active, name });
            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
        });

        it("UPDATE GROUP succeeded", async () => {
            const res = await exec({ idGroup: group._id, cookie, active, name });
            expect(res.status).toBe(200);
            expect(res.body.message).toBeDefined();
        });
    });
});
