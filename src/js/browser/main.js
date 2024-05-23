import './ui/index.js';

const shared = {
  setup: false,
}

async function start () {
  let dom;
  if (!shared.setup) {
    shared.setup = true;
    dom = document.createElement ('backtick-cli');
    document.body.appendChild (dom);
  }
}

start ();
