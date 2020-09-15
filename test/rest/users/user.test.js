const {request,init,cleanup, initDatabase} = require('../../helpers');

describe('Post Endpoints', ()=>{
    init();
    it('should create a new user', async () => {
      const res = await request
        .put('/api/users/123')
        .send({
          userId: 1,
          title: 'test is cool',
        })
      expect(res.statusCode).toEqual(200)
    })
  })