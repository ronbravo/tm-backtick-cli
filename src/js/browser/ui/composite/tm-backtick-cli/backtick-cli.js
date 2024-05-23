import mustache from 'mustache';
import template from './backtick-cli.html?raw';
import { action, listen } from '~common/index.js';

import './backtick-cli.less';
import 'boxicons/css/boxicons.min.css';

export const TAG_NAME = 'tm-backtick-cli';

const MINIMIZED_STYLE = 'minimized';

export class BacktickCli extends HTMLElement {
  constructor () {
    super ();
    this.data = {}
  }

  connectedCallback () {
    let dom;
    dom = this;
    dom.classList.add (TAG_NAME, 'component', MINIMIZED_STYLE);
    dom.innerHTML = template;

    dom.querySelector ('#prompt').addEventListener ('keydown', (event) => {
      if (event.key === '`') {
        toggleActive ({ deactivate: true, dom });
        event.preventDefault ();
      }
    });
    document.addEventListener ('keyup', (event) => {
      if (event.code === 'Escape' && dom.data.isOpen) {
        toggleActive ({ dom });
      }
      else if (event.key === '`') {
        toggleActive ({ dom });
      }
      else if (event.key === ':' && !dom.data.isOpen) {
        toggleActive ({ dom, prefix: ':tag ' });
      }
      else if (event.key === 'Enter' && dom.data.isOpen) {
        processInput ({ dom });
      }
    });
  }
}

function toggleActive (details = {}) {
  let { dom, deactivate = false, prefix = '' } = details;
  if (deactivate === true) {
    dom.classList.add (MINIMIZED_STYLE);
    dom.data.isOpen = false;
  }

  dom.data.isOpen = dom.classList.contains (MINIMIZED_STYLE);
  if (dom.data.isOpen) {
    setTimeout (() => {
      let target;
      target = dom.querySelector ('#prompt');
      target.focus ();
      target.value = prefix;
      dom.data.prefix = prefix;
    }, 10);
  }
  dom.classList.toggle (MINIMIZED_STYLE);
}

function processInput (details = {}) {
  let { dom } = details;
  let command, index, target, value;

  target = dom.querySelector ('#prompt');
  value = target.value.trim ();

  // TEST: value = ':tag a    a a    a      a, b#@  b@#    b!123, c12,  d   d323##';
  value = ':tag a    a a    a      a, b#@  b@#    b!123, c12,  d   d323##';

  index = value.indexOf (' ');
  command = value.substring (0, index).trim ();
  value = value.substring (index).trim ();
  dom.data.isOpen = false;

  target.value = '';
  dom.data.prefix = '';

  // NOTE: adding slight delay before hiding window
  // so that added elements can be scrolled into view
  setTimeout (() => {
    dom.classList.toggle (MINIMIZED_STYLE);
  }, 1);

  // temp
  if (command) {
    action ({ name: 'app.backtick.command', data: {
      dom,
      command,
      tags: value.split (','),
      target: {
        type: 'url',
        url: location.href,
      },
    }});
  }
}

listen ({
  name: 'ui.backtick.command',
  handler (details = {}) {
    let { command, dom } = details;
    let el, entry, target;
    if (dom) {
      // console.log (details);
      entry = details;
      el = document.createElement ('div');
      el.classList.add ('history', 'entry');
      el.innerHTML = mustache.render (ENTRY_TEMPLATE, details);

      target = dom.querySelector (':scope > .body #history');
      target.appendChild (el);

      target.scrollTop = target.scrollHeight;
      el.scrollIntoView ();
    }
  }
});

// function temp_addHistory (details = {}) {
//   let { command, dom } = details;
//   let el, entry, target;
//   if (dom) {
//     // console.log (details);
//     entry = details;
//     el = document.createElement ('div');
//     el.classList.add ('history', 'entry');
//     el.innerHTML = mustache.render (ENTRY_TEMPLATE, details);

//     target = dom.querySelector (':scope > .body #history');
//     target.appendChild (el);

//     target.scrollTop = target.scrollHeight;
//     el.scrollIntoView ();
//   }
// }

const ENTRY_TEMPLATE = `
<span class="command">{{ command }}</span><span class="seperator"> - </span>{{#target.tags}}<span  class="tag" href="#">{{ . }}</span>{{/target.tags}}
`.trim ();
