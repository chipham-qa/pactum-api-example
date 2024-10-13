const { spec } = require('pactum');

describe('Authorization Challenges', () => {

    let token;
  
    before(async () => {
      token = await spec()
        .post('/secret/token')
        .withAuth('admin', 'password')
        .expectStatus(201)
        .returns('res.headers.x-auth-token');
    });
  
    it('GET /secret/note with invalid auth token', async () => {
      await spec()
        .get('/secret/note')
        .withHeaders('X-AUTH-TOKEN', 'abc')
        .expectStatus(403);
    });
  
    it('GET /secret/note with no auth token', async () => {
      await spec()
        .get('/secret/note')
        .expectStatus(401);
    });
  
    it('GET /secret/note with valid auth token', async () => {
      await spec()
        .get('/secret/note')
        .withHeaders('X-AUTH-TOKEN', token)
        .expectStatus(200)
        .expectJson({
          "note": ""
        });
    });
  
    it('POST /secret/note with valid auth token', async () => {
      await spec()
        .post('/secret/note')
        .withHeaders('X-AUTH-TOKEN', token)
        .withJson({
          "note": "secret"
        })
        .expectStatus(200);
    });
  
    it('POST /secret/note with no auth token', async () => {
      await spec()
        .post('/secret/note')
        .withJson({
          "note": "secret"
        })
        .expectStatus(401);
    });
  
    it('POST /secret/note with invalid auth token', async () => {
      await spec()
        .post('/secret/note')
        .withHeaders('X-AUTH-TOKEN', 'abc')
        .withJson({
          "note": "secret"
        })
        .expectStatus(403);
    });
  
    it('GET /secret/note with valid Bearer token', async () => {
      await spec()
        .get('/secret/note')
        .withHeaders('Authorization', `Bearer ${token}`)
        .expectStatus(200)
        .expectJson({
          "note": "secret"
        });
    });
  
    it('POST /secret/note with valid Bearer token', async () => {
      await spec()
        .post('/secret/note')
        .withHeaders('Authorization', `Bearer ${token}`)
        .withJson({
          "note": "secret"
        })
        .expectStatus(200);
    });
  
});

describe('Miscellaneous Challenges', () => {

    it('delete all todos', async () => {
      const ids = await spec()
        .get('/todos')
        .returns('todos[*].id');
    
      for (let i = 0; i < ids.length; i++) {
        await spec()
          .delete('/todos/{id}')
          .withPathParams('id', ids[i])
          .expectStatus(200);
      }
      await spec()
        .get('/todos')
        .expectStatus(200)
        .expectJson({
          "todos": []
        });
    }).timeout(60000);
});