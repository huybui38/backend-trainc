const { request, cleanup, setupDatabase, getCookie } = require("../../helpers");
const { createUsers, createCourse, createGroup } = require("../../createDbTesting");
const { Group } = require("../../../models/Group.model");
let cookieAdmin, cookieStudent, cookie;
let idGroup, name;

describe("Delete Group /groups/:id", () => {
    let db;
    beforeAll(async () => {
        db = await setupDatabase("delete_group");
        await createUsers(db);
        await createCourse(db);
        await createGroup(db);
        cookieStudent = await getCookie("se000000");
        cookieAdmin = await getCookie("admin123");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async () => {
        return await request.delete(`/api/groups/${idGroup}`).set("cookie", cookie).send({ name });
    };

    it("DELETE GROUP failed: Not found", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        name = "project java";

        const res = await exec();

        expect(res.status).toEqual(401);
        expect(res.body.message).toEqual("Name is not correct.");
    });

    it("DELETE GROUP failed: isAdmin false", async () => {
        cookie = cookieStudent;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        name = "project c";

        const res = await exec();

        expect(res.status).toEqual(403);
        expect(res.body.message).toEqual("Forbidden.");
    });

    it("DELETE GROUP: successful", async () => {
        cookie = cookieAdmin;
        const group = await Group.findOne({ name: "project c" });
        idGroup = group._id;
        name = "project c";

        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toEqual("Group was deleted successfully.");
    });
});
