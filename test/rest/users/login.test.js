const {request, cleanup, setupDatabase } = require('../../helpers');
const { createUsers } = require('../../createDbTesting');
let code, password;

describe('Login user: /users', () => {
	let db;
	beforeAll(async()=>{
		db = await setupDatabase('login_user');
		await createUsers(db);
	});
	afterAll(async ()=>{
		await cleanup(db);
	});
	
	const exec = async () => {
        return await request
        .post('/api/users/login')
		.send({ code, password })
	}
	
	it("should return 200 LOGIN user successful", async () => {
		code = "admin123";
		password = "123456789"
	
		const res = await  exec();
		expect(res.status).toEqual(200);
		expect(res.text).toMatch("Login success.");
	})

	it("should return 400 LOGIN failed: 'code' less than 8 characters long", async () => {
		code = "admin";
		password = "123456789"
	
		const res = await  exec();
		expect(res.status).toEqual(400);
	})

	it("should return 400 LOGIN failed: 'code' more than 8 characters long", async () => {
		code = "admin123456";
		password = "123456789"
	
		const res = await  exec();
		expect(res.status).toEqual(400);
	})

	it("should return 400 LOGIN failed: 'password' less than 8 charaters long", async () => {
		code = "admin123";
		password = "1"
	
		const res = await  exec();
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch('"password" length must be at least 8 characters long');  

	})

	it("should return 400 LOGIN failed: 'password' more than 255 charaters long", async () => {
		code = "admin123";
		password = new Array(260).join('1');
	
		const res = await  exec();
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch('"password" length must be less than or equal to 255 characters long'); 
	})

	it("should return 401 LOGIN user failed: 'code' not correct", async () => {
		code = "admin000";
		password = "123456789"
	
		const res = await  exec();
		expect(res.status).toEqual(401);
		expect(res.body.message).toMatch('Student code or password is not correct.');
	})

	it("should return 401 LOGIN user failed: 'password' not correct", async () => {
		code = "admin123";
		password = "12345678"
	
		const res = await  exec();
		expect(res.status).toEqual(401);
		expect(res.body.message).toMatch('Student code or password is not correct.');
	})
  })
