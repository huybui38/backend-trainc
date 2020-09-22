const { iteratee } = require('lodash');
const {request,init, getCookie} = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;
let name, active, nameCourse;

describe('Update courses /:name', () => {
    const exec = async  () => {
        return await request
            .put(`/api/courses/${nameCourse}`)
            .set('cookie', cookie)
            .send({
                name: name,
                active: active
            })
    }

    init();
    beforeEach( async () => {
        cookieAdmin = await getCookie('admin123');
        cookieStudent =await getCookie('se000000')
    })

    it("should return 200 UPDATE COURSES successful", async () => {
        cookie = cookieAdmin;
        nameCourse = 'learning c'
        name = 'learning java';
        active = true;

        const res = await exec();

        expect(res.status).toEqual(200);
        console.log(res.body);
    })

    it("should return 404 UPDATE COURSES failed: Not found course", async () => {
        cookie = cookieAdmin;
        nameCourse = 'learning C#'
        name = 'LEARNING';
        active = true;

        const res = await exec();

        expect(res.status).toEqual(404);
    })

})