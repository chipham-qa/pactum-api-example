const { spec, request } = require('pactum');

describe('With Path', () => {
	
    before(async () => {
		request.setBaseUrl("");
	});

    it('Get User With Path 1', async () => {
        await spec()
            .get('/api/users/{user_id}/accounts/{account_id}')
            .withPathParams('user_id', 1)
            .withPathParams('account_id', 'CY001001')
            .expectStatus(200)
    })

    it('Get User With Path 2', async () => {
        await spec()
            .get('/api/users/{user_id}/accounts/{account_id}')
            .withPathParams({
                'user_id': 1,
                'account_id': 'CY001001'})
            .expectStatus(200)
    })
});