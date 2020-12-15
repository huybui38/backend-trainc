const { request, cleanup, setupDatabase, getCookie } = require("../../helpers");
const { createUsers, createCourse } = require("../../createDbTesting");
const { before } = require("lodash");

describe("Create Group /groups", () => {
    let db;
    let cookie;
    let name, password, course;

    beforeAll(async () => {
        db = await setupDatabase("create_group");
        await createUsers(db);
        await createCourse(db);
    });

    const exec = async ({ name, password, course }) => {
        return await request.post("/api/groups/").set("cookie", cookie).send({ name, password, course });
    };

    describe("with student cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("se000000");
        });

        beforeEach(async () => {
            name = "project c";
            password = "123456789";
            course = "learning c";
        });

        it("CREATE GROUP failed: isAdmin false", async () => {
            const res = await exec({ name, password, course });

            expect(res.status).toBe(403);
            expect(res.body.message).toBeDefined();
        });
    });

    describe("with admin cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("admin123");
        });

        beforeEach(async () => {
            name = "project c";
            password = "123456789";
            course = "learning c";
        });

        it("CREATE GROUP failed: 'course' is not correct", async () => {
            course = "learning java";
            const res = await exec({ name, password, course });

            expect(res.status).toBe(401);
            expect(res.body.message).toBeDefined();
        });

        it("CREATE GROUP succeeded", async () => {
            const res = await exec({ name, password, course });

            expect(res.status).toBe(200);
            expect(res.body.message).toBeDefined();
        });

        it("CREATE GROUP failed: 'name' is taken", async () => {
            const res = await exec({ name, password, course });

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });
    });

    afterAll(async () => {
        await cleanup(db);
    });
});
