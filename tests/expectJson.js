const { spec, stash } = require('pactum');
const { like } = require('pactum-matchers');
const { gte, lte } = require("pactum-matchers");

describe("Expect Json", () => {

    it('Strict Deep Equal', async () => {
    await spec()
        .get('https://reqres.in/api/users/1')
        .expectJson({
            "data": {
                "id": 1,
                "email": "george.bluth@reqres.in",
                "first_name": "George",
                "last_name": "Bluth",
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
                },
            "support": {
                "url": "https://reqres.in/#support-heading",
                "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
            }
        })
    });

  it('Using Json Path', async () => {
    await spec()
      .get('https://reqres.in/api/users/1')
      .expectJson('data.first_name', 'George')
      .expectJson('data.last_name', 'Bluth')
    });

    it('User data template', async () => {
        stash.addDataTemplate({
            'FIST_USER': {
                "data": {
                    "id": 1,
                    "email": "george.bluth@reqres.in",
                    "first_name": "George",
                    "last_name": "Bluth",
                    "avatar": "https://reqres.in/img/faces/1-image.jpg"
                  },
                  "support": {
                    "url": "https://reqres.in/#support-heading",
                    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
                  }
            }
        });

        await spec()
          .get('https://reqres.in/api/users/1')
          .expectJson('FIST_USER');
    });

    it('User data template', async () => {
        stash.addDataTemplate({
            'FIST_USER': {
                "data": {
                    "id": 1,
                    "email": "george.bluth@reqres.in",
                    "first_name": "George",
                    "last_name": "Bluth",
                    "avatar": "https://reqres.in/img/faces/1-image.jpg"
                  },
                  "support": {
                    "url": "https://reqres.in/#support-heading",
                    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
                  }
            }
        });

        await spec()
          .get('https://reqres.in/api/users/1')
          .expectJson('FIST_USER');
    });

    it('Regular Expressions', async () => {
        await spec()
          .get('https://reqres.in/api/users/1')
          .expectJsonLike({
            "data": {
                "id": /\d+/,
                "first_name": "George",
                "last_name": "Bluth"
            }
        })
    });

    it('Assert Expressions', async () => {
        await spec()
          .get('https://reqres.in/api/users/1')
          .expectJsonLike({
            "data": {
                "id":"typeof $V === 'number'",
                "first_name": "George",
                "last_name": "Bluth"
            }
        });

        await spec()
            .get('https://reqres.in/api/users')
            .expectJsonLike({
                "data": "$V.length === 6"
        });
    });

    it('Expect Json Match', async () => {
        await spec()
          .get('https://reqres.in/api/users/1')
          .expectJsonMatch({
            "data": {
                "first_name": like("Geo"),
                "last_name": "Bluth"
            }
        });
    });

    it('Expect Json Schema', async () => {
        await spec()
        .get('https://reqres.in/api/users/1')
        .expectJsonSchema({
            "properties": {
                "data": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "number" },
                    "first_name": { "type": "string" },
                    "last_name": { "type": "string" }
                  },
                  "required": ["id", "first_name", "last_name"]
                }
              },
              "required": ["data"]
        });
    });

    it('Expect Json Length', async () => {
        await spec()
            .get('https://jsonplaceholder.typicode.com/users')
            .expectJsonLength(10);

        await spec()
            .get('https://reqres.in/api/users')
            .expectJsonLength('data', 6);

        await spec()
            .get('https://jsonplaceholder.typicode.com/users')
            .expectJsonLength('.', gte(10));

        await spec()
            .get('https://reqres.in/api/users')
            .expectJsonLength('data', lte(6));
    });
});

