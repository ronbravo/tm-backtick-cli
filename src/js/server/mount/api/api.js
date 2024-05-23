function mountInfo (details = {}) {
  let { api, app } = details;
  app.get (`${api}/status`, (req, res) => res.send ({ code: 200, message: 'ok' }));
}

export function mountApi (details) {
  mountInfo (details);
}
