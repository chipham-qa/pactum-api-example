const { spec, request } = require('pactum');


describe('With Body', () => {

    it('POST: Users', async () => {
        await spec()
            .post('https://reqres.in/api/users')
            .withBody({
                "name": "morpheus",
                "job": "leader"              
            })
            .expectStatus(201)
    });
});