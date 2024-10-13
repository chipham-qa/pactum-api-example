const { spec, handler } = require('pactum');


describe('Store', () => {

    it('Store Single Value', async () => {
        await spec()
        .get('http://jsonplaceholder.typicode.com/posts')
        .expectStatus(200)
        .stores('FirstPostId', '[0].id');

        await spec()
        .get(`http://jsonplaceholder.typicode.com/posts/{id}/comments`)
        .withPathParams('id', '${FirstPostId}')
        .expectStatus(200);
    });

    it('Custome function', async () => {
        await spec()
        .get('http://jsonplaceholder.typicode.com/posts')
        .expectStatus(200)
        .stores((request, response) => {
          return {
            custom_func_id: response.body[0].id,
          };
        });
        await spec()
        .get(`http://jsonplaceholder.typicode.com/posts/{id}/comments`)
        .withPathParams('id', '$S{custom_func_id}')
        .expectStatus(200);
    });
});

