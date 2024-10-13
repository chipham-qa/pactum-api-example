const { spec, request, reporter } = require('pactum');
const addContext = require('mochawesome/addContext');

const awesome_reporter = {
  after(spec) {
      //const mocha_context = spec.recorded ? spec.recorded['mocha'] : undefined;
      if (spec.request) {
          addContext(this, {
              title: 'Request',
              value: JSON.stringify(spec.request),
          });
      } else {
          console.warn("Warning: Request data is undefined.");
      }

      if (spec.response) {
          addContext(this, {
              title: 'Response',
              value: JSON.stringify(spec.response),
          });
      } else {
          console.warn("Warning: Response data is undefined.");
      }
  } 
}


before(async () => {
    try {
        await setRequestDefaults();
        await addDummyTodos();
        reporter.add(awesome_reporter);
    } catch (error) {
        console.error("Error in before hook:", error);
    }
});

async function setRequestDefaults() {
    request.setBaseUrl('https://apichallenges.herokuapp.com');
    const id = await getChallengerId();
    if (!id) {
        throw new Error("Challenger ID not found in the response headers.");
    }
    console.log(`API Challenges | Challenger ID - ${id} \n`);
    request.setDefaultHeaders('X-CHALLENGER', id);
}

async function getChallengerId() {
    return await spec()
        .post('/challenger')
        .expectStatus(201)
        .returns('res.headers.x-challenger');
}

async function addDummyTodos() {
    await spec()
        .post('/todos')
        .withJson({
            "title": "process payroll",
            "doneStatus": false,
            "description": ""
        })
        .expectStatus(201);

    await spec()
        .post('/todos')
        .withJson({
            "title": "train staff",
            "doneStatus": false,
            "description": ""
        })
        .expectStatus(201);
}
