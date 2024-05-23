import bodyParser from 'body-parser';
import cors from 'cors';
import restana from 'restana';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { join } from 'path';

function mountInfo (details = {}) {
  let { api, app } = details;
  app.get (`${api}/status`, (req, res) => res.send ({ code: 200, message: 'ok' }));
}

async function setup (details = {}) {
  let { app, base } = details;

  setupCors (details);
  app.use (bodyParser.json ());

  app.use (serveStatic (join (base, 'dist')));
  app.use (serveStatic (join (base, 'public')));
}

export async function startServer (details = {}) {
  let { port = 2000 } = details;
  let app, base, config;

  base = fileURLToPath (import.meta.url);
  base = join (base, '..', '..', '..', '..');

  config = {
    api: '',
    base,
    port,
  }

  app = restana ();
  details = config;
  details.app = app;

  setup (details);
  mountInfo (details);

  app.start (port);
  console.log (`- server started on port:`, port);
}


// -------------------------------------------------------------
// handle cors

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

function setupCors (details = {}) {
  let { app } = details;

  app.use (cors ());
  // app.options ('*', handleCorsPreFlight) // enable pre-flight request for DELETE request
  // app.use (cors ({ origin: handleCors }));
}
