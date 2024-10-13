const { spec } = require('pactum');

describe("Example", () => {

it('should be a teapot', async () => {
  await spec()
    .get('http://httpbin.org/status/418')
    .expectStatus(418);
  });


it('should save a new user', async () => {
    await spec()
      .post('https://jsonplaceholder.typicode.com/users')
      .withHeaders('Authorization', 'Basic xxxx')
      .withJson({
        name: 'bolt',
        email: 'bolt@swift.run'
      })
      .expectStatus(201);
  });
});

