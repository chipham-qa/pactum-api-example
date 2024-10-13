const { spec } = require('pactum');

describe("Get Single User By Param", () => {
    it("Verify User Return Successfully", async() => {
        await spec()
            .get("https://reqres.in/api/users")
            .withQueryParams("page", "2")
            .expectStatus(200)
            .expectJsonMatch("page", 2)
            .expectJsonMatch("data[0].id", 7)
    });
});