const { spec, handler } = require('pactum');

handler.addSpecHandler('get user', (ctx) => {
    const { spec, data } = ctx;
    spec.get('https://reqres.in/api/users/{id}');
    spec.withPathParams('id', data || 1)
    spec.expectStatus(200);
});

describe('Use', () => {

    it('Example', async () => {          
        await spec().use('get user').expectJson('data.first_name', 'George');
        await spec().use('get user', 2).expectJson('data.first_name', 'Janet');      
    });
    
});