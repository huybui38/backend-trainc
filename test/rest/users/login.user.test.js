const {request,init,cleanup, initDatabase, createAdmin} = require('../../helpers');

  describe('Login user: /users', () => {
      init();
      it("should login user successful", async () => {
        const res = await  request
          .post('/api/users/login')
          .send({
            code: "admin123",
            password: "123456789"
          })
          expect(res.status).toEqual(200);
          expect(res.text).toMatch(/Login successful./);
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
