const { spec, handler } = require('pactum');

handler.addRetryHandler('on 404', (ctx) => {
    const res = ctx.res;
    if (res.statusCode === 404) {
        return false;
    } else {
        return true;
    }
});
describe('Retry with handler', () => {

    it('Run', async () => {
        await spec()
        .get('http://jsonplaceholder.typicode.com/posts')
        .retry({
          strategy: 'on 404'
        })
        .expectStatus(200);
    });
});
