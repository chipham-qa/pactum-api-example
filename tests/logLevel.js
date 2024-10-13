const { spec, settings } = require('pactum');


describe('Log Level', () => {
    settings.setLogLevel('ERROR');
    
    it('Example', async () => {
        await spec()
        .get('https://reqres.in/api/users/1')
        .expectStatus(200)
        .useLogLevel('DEBUG');

      
      // the below spec will have the default log level - 'INFO'
      await spec()
        .get('https://reqres.in/api/users/1')
        .expectStatus(200);
    });    
});