const { request, cleanup, setupDatabase, getCookie } = require("../../helpers");
const { createUsers, createCourse, createGroup } = require("../../createDbTesting");
const { Group } = require("../../../models/Group.model");

describe("Kick Member Group /groups/:id/members", () => {
    let db;
    let cookie;
    let code, group;

    beforeAll(async () => {
        db = await setupDatabase("delete_group");
        await createUsers(db);
        await createCourse(db);
        await createGroup(db);
        group = await Group.findOne({ name: "project c" });
    });

    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async ({ idGroup, cookie, code }) => {
        return await request.delete(`/api/groups/${idGroup}/members`).set("cookie", cookie).send({ code });
    };

    describe("with student cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("se000000");
        });

        beforeEach(async () => {
            code = "admin123";
        });

        it("KICK MEMBER failed: isAdmin false", async () => {
            const res = await exec({ idGroup: group._id, cookie, code });
            expect(res.status).toBe(403);
            expect(res.body.message).toBeDefined();
        });
    });

    describe("with admin cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("admin123");
        });

        beforeEach(async () => {
            code = "admin123";
        });

        it("KICK MEMBER failed: Not found", async () => {
            const res = await exec({ idGroup: group.course, code, cookie });
            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
        });

        it("KICK MEMBER failed: 'code' not found", async () => {
            code = "se222222";
            const res = await exec({ idGroup: group._id, cookie, code });
            expect(res.status).toBe(401);
            expect(res.body.message).toBeDefined();
        });

        it("KICK MEMBER succeeded", async () => {
            const res = await exec({ idGroup: group._id, cookie, code });
            expect(res.status).toBe(200);
            expect(res.body.message).toBeDefined();
        });
    });
});
