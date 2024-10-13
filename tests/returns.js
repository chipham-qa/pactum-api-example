const { spec, handler } = require('pactum');


describe('Returns', () => {

    it('Return Single Value', async () => {
        const postID = await spec()
            .get('http://jsonplaceholder.typicode.com/posts')
            .expectStatus(200)
            .returns('[0].id');
        
        console.log("postID: " + postID);    
        await spec()
            .get('http://jsonplaceholder.typicode.com/posts/{id}/comments')
            .withPathParams('id', postID)
            .expectStatus(200);
    });

    it('Return multiple value', async () => {
        const ids = await spec()
            .get('http://jsonplaceholder.typicode.com/posts')
            .expectStatus(200)
            .returns('[0].id')
            .returns('[1].id');
      
        await spec()
            .get(`http://jsonplaceholder.typicode.com/posts/${ids[0]}/comments`)
            .expectStatus(200);
      
        await spec()
            .get(`http://jsonplaceholder.typicode.com/posts/${ids[1]}/comments`)
            .expectStatus(200);
    });

    it('Custom function', async () => {
        const id = await spec()
            .get('http://jsonplaceholder.typicode.com/posts')
            .expectStatus(200)
            .returns((ctx) => { return ctx.res.json[0].id} );

        console.log("id: " + id);
    });

    it('Using Capture Handlers', async () => {
        handler.addCaptureHandler('first post id', (ctx) => {
            return ctx.res.json[0].id;
        });

        const postID = await spec()
            .get('http://jsonplaceholder.typicode.com/posts')
            .expectStatus(200)
            .returns('#first post id');
    });
});

