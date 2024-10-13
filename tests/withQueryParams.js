const { spec, request } = require('pactum');


describe('With Query Params', () => {
	
    before(async () => {
		request.setBaseUrl("https://randomuser.me/api");
	});

    it('Get User With Query Params 1', async () => {
        await spec()
            .get('/')
            .withQueryParams({
                'gender':'male',
                'nat': 'AU'
            })
            .expectStatus(200)
    });
});