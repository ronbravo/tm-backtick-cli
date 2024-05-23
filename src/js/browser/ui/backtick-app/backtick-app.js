import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';

import template from './backtick-app.html?raw';
import './backtick-app.less';

export const TAG_NAME = 'backtick-app';

export class BacktickApp extends HTMLElement {
  constructor () {
    super ();

    // // loads the Icon plugin
    // UIkit.use(Icons);

    // // components can be called from the imported UIkit reference
    // UIkit.notification('Hello world.');
  }

  connectedCallback () {
    this.classList.add (TAG_NAME, 'component');
    this.innerHTML = template;
    // loadStyle ({
    //   parent: this,
    //   url: 'http://localhost:2000/ui/backtick-app/backtick-app.css?raw',
    //   // url: '/@fs/home/ninabravo/tm-drive/ronbravo/media/backtick-cli/node_modules/.pnpm/uikit@3.21.3/node_modules/uikit/dist/css/uikit.min.css'
    // });
  }
}

// import axios from 'axios';

// async function loadStyle (details = {}) {
//   let { parent, url } = details;
//   let dom, reply;

//   dom = document.createElement ('style');
//   dom.innerHTML = style;
//   parent.appendChild (dom);

//   // dom = document.createElement ('style');
//   // dom.innerHTML = uikitStyle;
//   // parent.appendChild (dom);


//   // dom = document.createElement ('link');
//   // dom.href = 'http://localhost:2000/@fs/home/ninabravo/tm-drive/ronbravo/media/backtick-cli/node_modules/.pnpm/uikit@3.21.3/node_modules/uikit/dist/css/uikit.min.css';
//   // dom.rel = 'stylesheet';
//   // parent.appendChild (dom);

//   // console.log ('WHAT:', style);

//   // reply = await axios.get (url);
//   // console.log ('REPLY:', reply.data.split ('\n'));

//   // dom = document.createElement ('script');
//   // dom.type = 'module';
//   // dom.src = url;
//   // parent.appendChild (dom);

//   // let bob = eval (reply.data);

//   // dom = document.createElement ('style');
//   // dom.innerHTML = reply.data;
//   // parent.appendChild (dom);

//   // dom = document.createElement ('link');
//   // dom.setAttribute ('href', url);
//   // dom.setAttribute ('rel', 'stylesheet');
//   // // dom.setAttribute ('data-vite-dev-id', url);
//   // parent.appendChild (dom);

//   // console.log (reply.data);

//   // dom = document.createElement ('script');
//   // dom.type = 'module';
//   // dom.innerHTML = reply.data;
//   // parent.appendChild (dom);

//   // eval (reply.data);
//   // let mod = import (url);

//   // dom = document.createElement ('style');
//   // dom.setAttribute ('data-vite-dev-id', url);
//   // dom.innerHTML = reply.data;
//   // parent.appendChild (dom);

//   // dom.setAttribute ('href', '/@fs/home/ninabravo/tm-drive/ronbravo/media/backtick-cli/node_modules/.pnpm/uikit@3.21.3/node_modules/uikit/dist/css/uikit.min.css');
//   // dom.setAttribute ('rel', 'stylesheet');
//   // this.appendChild (dom);

//   // dom.setAttribute ('href', '/npm/uikit@3.21.3/dist/css/uikit.min.css');
//   // dom.setAttribute ('href', 'https://cdn.jsdelivr.net/npm/uikit@3.21.3/dist/css/uikit.min.css');
// }
