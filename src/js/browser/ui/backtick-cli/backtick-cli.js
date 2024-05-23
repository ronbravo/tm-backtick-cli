import template from './backtick-cli.html?raw';
import './backtick-cli.less';

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
      if (event.key === '`') {
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

  index = value.indexOf (' ');
  command = value.substring (0, index).trim ();
  value = value.substring (index).trim ();
  dom.data.isOpen = false;

  target.value = '';
  dom.data.prefix = '';
  dom.classList.toggle (MINIMIZED_STYLE);

  // temp
  if (command) {
    action ({ name: 'backtick.process.command', data: {
      command,
      tags: value.split (','),
      target: {
        type: 'url',
        url: location.href,
      },
    }});
  }
}

// ---------------------------
// handlers
const shared = {
  history: [],
}

function action (details = {}) {
  let { name } = details;
  if (name === 'backtick.process.command') { processCommand (details.data); }
}

function addToHistory (details = {}) {
}

function processCommand (details = {}) {
  let { command, tags, target } = details;
  console.log ('here:', details);
  if (command === ':tag') {
    processTags (details);
  }
}

function processTags (details = {}) {
  let { tags, target } = details;
  let block, list;
  block = {
    target,
    tags: [],
  }

  list = [];
  tags.forEach ((tag) => {
    tag = slugify ({ value: tag });
    if (tag) {
      list = list.concat (tag);
    }
  });
  block.tags.push.apply (block.tags, list);
  console.log (JSON.stringify (block, null, 2));
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