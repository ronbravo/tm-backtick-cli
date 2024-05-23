const actionShared = {
  listeners: {},
}

export async function action (details = {}) {
  let { name, data = {}} = details;
  let listeners, target;
  listeners = actionShared.listeners;
  target = listeners [name];
  if (target && target.list.length) {
    target.list.forEach ((handler) => {
      handler (data);
    });
  }
}

export async function listen (details = {}) {
  let { name, handler } = details;
  let listeners, target;
  listeners = actionShared.listeners;

  target = listeners [name];
  if (!target) {
    target = { name, list: [] }
    listeners [name] = target;
  }
  target.list.push (handler);
}

// -----------------------------------------------------
// -----------------------------------------------------

const shared = {
  history: [],
}

listen ({
  name: 'app.backtick.command',
  handler (details = {}) {
    let { command, tags, target } = details;
    // console.log ('here:', details);
    if (command === ':tag') {
      processTags (details);
    }
  }
});

function addToHistory (details = {}) {
}

// function processCommand (details = {}) {
//   let { command, tags, target } = details;
//   // console.log ('here:', details);
//   if (command === ':tag') {
//     processTags (details);
//   }
// }

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