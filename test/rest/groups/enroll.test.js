const { request, cleanup, setupDatabase, getCookie } = require("../../helpers");
const { createUsers, createCourse, createGroup } = require("../../createDbTesting");
const { Group } = require("../../../models/Group.model");
const { Course } = require("../../../models/Course.model");
const { before } = require("lodash");

describe("Enroll Group /groups/:id", () => {
    let db;
    let password;
    let idGroup;
    let cookie;

    beforeAll(async () => {
        db = await setupDatabase("enroll_group");
        await createUsers(db);
        await createCourse(db);
        await createGroup(db);

        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
    });

    const exec = async ({ idGroup, cookie, password = "" }) => {
        return await request.post(`/api/groups/${idGroup}`).set("cookie", cookie).send({ password });
    };

    describe("with admin cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("admin123");
        });

        beforeEach(async () => {
            password = "123456789";
        });

        it("ENROLL GROUP failed: Not found", async () => {
            const course = await Course.findOne({ name: "learning c" });
            const res = await exec({ cookie, idGroup: course._id });
            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
        });

        it("ENROLL GROUP failed: 'password' isn't correct", async () => {
            password = "wrongPassword";
            const res = await exec({ cookie, idGroup, password });
            expect(res.body.message).toBeDefined();
            expect(res.status).toBe(401);
        });

        it("ENROLL GROUP failed: 'code' have already enrolled", async () => {
            const res = await exec({ cookie, idGroup, password });
            expect(res.body.message).toBeDefined();
            expect(res.status).toBe(400);
        });
    });

    describe("with student cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("se000000");
        });

        beforeEach(async () => {
            password = "123456789";
        });

        it("ENROLL GROUP succeeded", async () => {
            const res = await exec({ cookie, idGroup, password });
            expect(res.status).toBe(200);
            expect(res.body.message).toBeDefined();
        });
    });

    afterAll(async () => {
        await cleanup(db);
    });
});
