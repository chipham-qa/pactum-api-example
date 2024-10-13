const { spec, handler, expect } = require('pactum');


describe('TOSS', () => {

    it('Example', async () => {
        const _spec = spec();
        _spec.get('https://reqres.in/api/users/1');
        const response = await _spec.toss();
        expect(response).to.have.jsonLike({ 
            "data": { "first_name": "George" } 
        });
    });
});

