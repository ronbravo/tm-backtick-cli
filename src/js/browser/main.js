import './ui/index.js';

const shared = {
  setup: false,
}

async function start () {
  let dom;
  if (!shared.setup) {
    shared.setup = true;

    if (location.href.indexOf ('localhost') === -1) {
      console.log ('- loading backtick cli styling');
      dom = document.createElement ('link');
      dom.setAttribute ('crossorigin', '');
      dom.setAttribute ('rel', 'stylesheet');
      dom.setAttribute ('href', `http://localhost:2000/assets/index.css`);
      document.head.appendChild (dom);
    }

    dom = document.createElement ('tm-backtick-cli');
    document.body.appendChild (dom);
  }
}

start ();
