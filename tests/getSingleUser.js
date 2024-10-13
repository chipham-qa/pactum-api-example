const { spec } = require('pactum');
const { faker } = require('@faker-js/faker');

const randomName = faker.person.fullName();
const randomJob = faker.person.jobTitle();


describe("User Test Cases", () => {
    it("Verify Get User Successfully", async() => {
        await spec()
            .get("https://reqres.in/api/users/2")
            .expectStatus(200)
            .expectBody(
                {
                    "data": {
                    "id": 2,
                    "email": "janet.weaver@reqres.in",
                    "first_name": "Janet",
                    "last_name": "Weaver",
                    "avatar": "https://reqres.in/img/faces/2-image.jpg"
                    },
                    "support": {
                    "url": "https://reqres.in/#support-heading",
                    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
                    }
                }
            )
    });

    it("Verify User Not Found", async() => {
        await spec()
            .get("https://reqres.in/api/users/23")
            .expectStatus(404)
            .expectBody(
                {}
            )
    });

    it("Verify Create User", async() => {
        await spec()
            .post("https://reqres.in/api/users")
            .withJson({
                    "name": randomName,
                    "job": randomJob
                })
            .expectStatus(201)
            .expectJsonLike({
                "name": randomName,
                "job": randomJob
            })
    });

    it("Verify Update User", async() => {
        await spec()
            .put("https://reqres.in/api/users/2")
            .withJson({
                    "name": randomName,
                    "job": randomJob
                })
            .expectStatus(200)
            .expectJsonLike({
                "name": randomName,
                "job": randomJob
            })
    });


});