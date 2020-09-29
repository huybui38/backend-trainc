const {request, cleanup, setupDatabase, createUsers, getCookie} = require('../../helpers');
let cookieAdmin, cookieStudent, cookie;
let code, name, role;

describe('Create user: /', () => {
	let db;
	beforeAll(async()=>{
        db = await setupDatabase('create_user');
		await createUsers(db);
		cookieStudent = await getCookie('se000000');
        cookieAdmin = await getCookie('admin123');
    });
    afterAll(async ()=>{
        await cleanup(db);
	});
	
	const exec = async () => {
        return await request
        .post('/api/users/')
		.set('cookie', cookie)
		.send({ code, name, role })
	}
	
    it('should return 200 CREATE successful', async () => {
		cookie = cookieAdmin;
		code = "se123123";
		name = "test";
		role = "0"

		const res = await exec();
		expect(res.status).toEqual(200);
		expect(res.text).toMatch("User was created successfully.")
	})
	
    it("should return 400 CREATE failed: 'code' more then 8 characters long", async () => {
		cookie = cookieAdmin;
		code = "se123123123";
		name = "test";
		role = "0"

		const res = await exec();
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch('"code" length must be less than or equal to 8 characters long');
	})

		
    it("should return 400 CREATE failed: 'code' less than 8 characters long", async () => {
		cookie = cookieAdmin;
		code = "se123";
		name = "test";
		role = "0"

		const res = await exec();
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch('"code" length must be at least 8 characters long');
	})
	
    it("should return 400 CREATE failed: 'name' empty", async () => {
		cookie = cookieAdmin;
		code = "se123123";
		name = "";
		role = "0"
		
		const res = await exec();
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch('"name" is not allowed to be empty');
	})

	it("should return 400 CREATE failed: 'name' is more than 255 characters long", async () => {
		cookie = cookieAdmin;
		code = "se123123";
		name = new Array(260).join('a');
		role = "0"

		const res = await exec();
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch('"name" length must be less than or equal to 255 characters long');
	})

	it("should return 400 CREATE failed: 'name' have number and special charaters", async () => {
		cookie = cookieAdmin;
		code = "se123123";
		name = "Test@ 123";
		role = "0"

		const res = await exec();
		expect(res.status).toEqual(400);
	})
	
    it("should return 400 CREATE failed: 'role' is bigger than [0,1]", async () => {
		cookie = cookieAdmin;
		code = "se123123";
		name = "test";
		role = "2"

		const res = await exec();
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch('"role" must be one of [1, 0]');
	})

	it("should return 403 CREATE failed: isAdmin false", async () => {
		cookie = cookieStudent;
		code = "se123123";
		name = "test";
		role = "0"

		const res = await exec();
		expect(res.status).toEqual(403);
	})
  })