import './ui/index.js';

const shared = {
  setup: false,
}

async function start () {
  let dom;
  if (!shared.setup) {
    shared.setup = true;

    dom = document.createElement ('link');
    // <link rel="stylesheet" crossorigin href="/assets/index-DdZ8bv1A.css">
    dom.setAttribute ('crossorigin', '');
    dom.setAttribute ('rel', 'stylesheet');
    dom.setAttribute ('href', `http://localhost:2000/assets/index-DdZ8bv1A.css`);
    document.head.appendChild (dom);

    dom = document.createElement ('backtick-cli');
    document.body.appendChild (dom);
  }
}

start ();
