const shared = {
  history: [],
}

export function action (details = {}) {
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
