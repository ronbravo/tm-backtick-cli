import cors from 'cors';

function handleCors (origin, callback) {
  console.log ('ORIGIN:', origin);
  callback (null, true);
  // callback ({
  //   "origin": origin,
  //   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   "preflightContinue": false,
  //   "optionsSuccessStatus": 204
  // })
}

function handleCorsPreFlight () {
  console.log ('arguments:', arguments);
}

export function setupCors (details = {}) {
  let { app } = details;

  app.use (cors ());
  // app.options ('*', handleCorsPreFlight) // enable pre-flight request for DELETE request
  // app.use (cors ({ origin: handleCors }));
}
