const { spec, reporter } = require('pactum');



describe('Records', () => {
    it('Record value', async () => {   
        const custom_reporter = {
            afterSpec(spec) {
              // prints - { first_id: 1 }
              console.log(spec.recorded);
            }
        }
        
        reporter.add(custom_reporter);
         
        const postID = await spec()
        .get('http://jsonplaceholder.typicode.com/posts')
        .expectStatus(200)
        .records('first_id', '[0].id');
    });
});
