const {request, cleanup, setupDatabase, createUsers} = require('../../helpers');
var cookie;

describe('Create user: /', () => {
    beforeAll(async()=>{
        db = await setupDatabase('create_user');
        await createUsers(db);
    });
    afterAll(async ()=>{
        await cleanup(db);
    });

	it("should LOGIN user successful", async () => {
        const res = await  request
        .post('/api/users/login')
        .send({
            code: "admin123",
            password: "123456789"
        })
		cookie = await res.headers['set-cookie'][0];
        expect(res.status).toEqual(200);
    })

    it('should CREATE a new user successful', async () => {
		const res = await request
		.post('/api/users/')
		.set('cookie', cookie)
		.send({
			code: "se123123",
			name: "test",
			role: "0"
		})
		expect(res.status).toEqual(200);
		expect(res.text).toMatch("User was created successfully.")
	})
	
    it('should CREATE a new user failed code input', async () => {
		const res = await request
		.post('/api/users/')
		.set('cookie', cookie)
		.send({
			code: "se1231234",
			name: "test",
			role: "0"
		})
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch("\"code\" length must be less than or equal to 8 characters long");
	})

		
    it('should CREATE a new user failed code input', async () => {
		const res = await request
		.post('/api/users/')
		.set('cookie', cookie)
		.send({
			code: "se123",
			name: "test",
			role: "0"
		})
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch("\"code\" length must be at least 8 characters long");
	})
	
    it('should CREATE a new user failed name input', async () => {
		const res = await request
		.post('/api/users/')
		.set('cookie', cookie)
		.send({
			code: "se123123",
			name: "",
			role: "0"
		})
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch("\"name\" is not allowed to be empty");
	})

	it('should CREATE a new user failed name input', async () => {
		const res = await request
		.post('/api/users/')
		.set('cookie', cookie)
		.send({
			code: "se123123",
			name: "test 123",
			role: "0"
		})
		expect(res.status).toEqual(400);
	})
	
    it('should CREATE a new user failed role input', async () => {
		const res = await request
		.post('/api/users/')
		.set('cookie', cookie)
		.send({
			code: "se123123",
			name: "admin",
			role: "3"
		})
		expect(res.status).toEqual(400);
		expect(res.body.message).toMatch("\"role\" must be one of [1, 0]");
	})
  })