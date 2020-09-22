const {request,createAdmin,cleanup,setupDatabase} = require('../../helpers');
  describe('Login user: /users', () => {
    let db;
    beforeAll(async()=>{
        const { connectDatabase } = require("../../../helpers/database.helper");
        db =  await connectDatabase(`login_user`);
        await createAdmin(db);
    });
    afterAll(async ()=>{
        await db.dropDatabase();
        await db.close();
    });
      it("should login user successful", async () => {
        const res = await  request
          .post('/api/users/login')
          .send({
            code: "admin123",
            password: "123456789"
          })
          console.log(res.body)
          expect(res.status).toEqual(200);
          expect(res.text).toMatch("Login success.");
      })
      it("should login user failed (Invalid code input)", async () => {
        const res = await request
          .post('/api/users/login')
          .send({
            code: "admin",
            password: "123456789"
          })
          expect(res.status).toEqual(400);
          expect(res.body.message).toMatch("\"code\" length must be at least 8 characters long");
      })
      it("should login user failed (Invalid password input)", async () => {
        const res = await request
          .post('/api/users/login')
          .send({
            code: "admin123",
            password: "1"
          })
          expect(res.status).toEqual(400);
          expect(res.body.message).toMatch('"password" length must be at least 5 characters long');
          
      })
      it("should login user failed (Unauthorized password)", async () => {
      const res = await request
        .post('/api/users/login')
        .send({
          code: "admin123",
          password: "12345678"
        })
        expect(res.status).toEqual(401);
        expect(res.body.message).toMatch('Student code or password is not correct.');
    })
      it("should login user failed (Unauthorized code)", async () => {
        const res = await request
          .post('/api/users/login')
          .send({
            code: "admin111",
            password: "123456789"
          })
          expect(res.status).toEqual(401);
          expect(res.body.message).toMatch('Student code or password is not correct.');
      })
  })
