const { spec } = require('pactum');


describe('Prints request & response details to the console.', () => {

    it('POST: Users', async () => {
        await spec()
        .get('https://reqres.in/api/users/1')
        .inspect();
    });

    it('POST: Users', async () => {
        const ids = await spec()
        .get('https://reqres.in/api/users?page=2')
        .returns('data[0].id')
        .returns('data[1].id');
        
        console.log(ids);
    });
    
    it('Expect Header', async () => {
        await spec()
        .get('https://reqres.in/api/users')
        .expectHeader('content-type', 'application/json; charset=utf-8');
    });
});