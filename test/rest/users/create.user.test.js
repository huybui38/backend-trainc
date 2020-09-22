const {request,createAdmin,cleanup,setupDatabase} = require('../../helpers');

describe('Create user: /', () => {
    let cookie;
    let db,session;
    beforeAll(async()=>{
        db = await setupDatabase('create_user');
        await createAdmin(db);
    });
    afterAll(async ()=>{
        await cleanup(db);
    });
    it("should login user successful", async () => {
        const res = await request
          .post('/api/users/login')
          .send({
            code: "admin123",
            password: "123456789"
          })
        //   console.log(res.body);
          cookie = res.headers['set-cookie'][0];
          expect(res.status).toEqual(200);
          expect(res.text).toMatch("Login success.");
      })
    it('should create a new user successful', async () => {
      const res = await request
        .post('/api/users/')
        .set('cookie', cookie)
        .send({
          code: "se123123",
          name: "test",
          role: "0"
        })
     console.log(res.body)
      expect(res.status).toEqual(200);
      expect(res.text).toMatch("User was created successfully.");   
    })
    it('should create a new user failed code input', async () => {
      const res = await request
        .post('/api/users')
        .set('cookie', cookie)
        .send({
          code: "se1231234",
          name: "test",
          role: "0"
        })
      expect(res.status).toEqual(400);
      expect(res.body.message).toMatch("\"code\" length must be less than or equal to 8 characters long");      
    })
    it('should create a new user failed name input', async (done) => {
      const res = await request
        .post('/api/users')
        .set('cookie', cookie)
        .send({
          code: "se123123",
          name: "",
          role: "0"
        })
      expect(res.status).toEqual(400);
      expect(res.body.message).toMatch("\"name\" is not allowed to be empty");        done();
    })
    it('should create a new user failed role input', async (done) => {
      const res = await request
        .post('/api/users')
        .set('cookie', cookie)
        .send({
          code: "se123123",
          name: "admin",
          role: "2"
      })
      expect(res.status).toEqual(400);
  
          expect(res.body.message).toMatch("\"role\" must be one of [1, 0]");        done();
    })
  })