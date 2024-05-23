import mustache from 'mustache';
import template from './backtick-cli.html?raw';
import './backtick-cli.less';
import 'boxicons/css/boxicons.min.css';

export const TAG_NAME = 'backtick-cli';

const MINIMIZED_STYLE = 'minimized';

export class BacktickCli extends HTMLElement {
  constructor () {
    super ();
    this.data = {}
  }

  connectedCallback () {
    this.classList.add (TAG_NAME, 'component', MINIMIZED_STYLE);
    this.innerHTML = template;

    document.addEventListener ('keyup', (event) => {
      if (event.code === 'Escape' && this.data.isOpen) {
        toggleActive ({ dom: this });
      }
      else if (event.key === '`' && !this.data.isOpen) {
        toggleActive ({ dom: this });
      }
      else if (event.key === ':' && !this.data.isOpen) {
        toggleActive ({ dom: this, prefix: ':tag ' });
      }
      else if (event.key === 'Enter' && this.data.isOpen) {
        processInput ({ dom: this });
      }
    })
  }
}

function toggleActive (details = {}) {
  let { dom, prefix = '' } = details;
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

function temp_addHistory (details = {}) {
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

const ENTRY_TEMPLATE = `
<span class="command">{{ command }}</span><span class="seperator"> - </span>{{#target.tags}}<span  class="tag" href="#">{{ . }}</span>{{/target.tags}}
`.trim ();

// ---------------------------
// handlers
const shared = {
  history: [],
}

function action (details = {}) {
  let { name } = details;
  if (name === 'app.backtick.command') { processCommand (details.data); }

  if (name === 'ui.backtick.command') { temp_addHistory (details.data); }
}

function addToHistory (details = {}) {
}

function processCommand (details = {}) {
  let { command, tags, target } = details;
  // console.log ('here:', details);
  if (command === ':tag') {
    processTags (details);
  }
}

function processTags (details = {}) {
  let { command, tags, target } = details;
  let list;


  list = [];
  tags.forEach ((tag) => {
    tag = slugify ({ value: tag });
    if (tag) {
      list = list.concat (tag);
    }
  });
  details.target.tags = list;
  action ({ name: 'ui.backtick.command', data: details });
}

function slugify (details = {}) {
  // TEST: value = ':tag a    a a    a      a, b#@  b@#    b!123, c12,  d   d323##';
  let { value = '' } = details;
  value = value.trim ().toLowerCase ();
  value = value.replace (/\s+/g, ' ');
  value = value.replace (/(\W)+/g, '-');
  if (value) {
    value = value.replace (/(^(\-)|[-]*$)+/g, '');
  }
  return value;
}
