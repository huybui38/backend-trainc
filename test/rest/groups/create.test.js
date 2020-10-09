const { request, cleanup, setupDatabase, getCookie } = require("../../helpers");
const { createUsers, createCourse } = require("../../createDbTesting");

describe("Create Group /groups", () => {
    let db;
    let cookie;
    let name, password, course;

    beforeAll(async () => {
        db = await setupDatabase("create_group");
        await createUsers(db);
        await createCourse(db);
    });

    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async ({ name, password, course }) => {
        return await request.post("/api/groups/").set("cookie", cookie).send({ name, password, course });
    };

    describe("with student cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("se000000");
        });

        it("CREATE GROUP failed: isAdmin false", async () => {
            name = "project c";
            password = "123456789";
            course = "learning c";

            const res = await exec();

            expect(res.status).toBe(403);
            expect(res.body.message).toBeDefined();
        });
    });

    describe("with admin cookie", () => {
        beforeAll(async () => {
            cookie = await getCookie("admin123");
        });

        it("CREATE GROUP failed: 'course' not found", async () => {
            name = "project java";
            password = "123456789";
            course = "learning java";

            const res = await exec();

            expect(res.status).toBe(401);
            expect(res.body.message).toBeDefined();
        });

        it("CREATE GROUP succeeded", async () => {
            name = "project c";
            password = "123456789";
            course = "learning c";

            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.text).toBeDefined();
        });
    });
});
