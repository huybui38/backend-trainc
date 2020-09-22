const { request, init, getCookie } = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;
let name;

describe('Create courses /', () => {
    const exec = async () => {
        return await request
        .post('/api/courses/')
        .set('cookie', cookie)
        .send({
            name: name
    })}

    init();
    beforeEach( async () => {
        cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    })

    it("should return 200 when CREATE successful", async () => {
        cookie = cookieAdmin;
        name = "Learning Java";
        
        const res = await exec();

        expect(res.status).toEqual(200);
        expect(res.text).toMatch("Course was created successfully.")
    })

    it("should return 400 when CREATE failed with: 'name' empty", async () => {
        cookie = cookieAdmin;
        name = "";

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 400 when CREATE failed with: 'name' has special characters" , async () => {
        cookie = cookieAdmin;
        name = "#Learning C#";

        const res = await exec();

        expect(res.status).toEqual(400);
    })

    it("should return 403 when CREATE failed with: isAdmin false", async () => {
        cookie = cookieStudent;
        name = "Learning C";

        const res = await exec();

        expect(res.status).toEqual(403);
    })

})