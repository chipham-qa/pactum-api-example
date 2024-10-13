const { spec, handler } = require('pactum');


describe('Save', () => {
    it('Save img', async () => {
        await spec()
        .get('https://httpbin.org/image/png')
        .save('data/pig.png')
        .expectStatus(200);
    });
});

