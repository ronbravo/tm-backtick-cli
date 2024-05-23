// ==UserScript==
// @name         Backtick CLI
// @namespace    https://backtick.thetrg.org
// @version      0.1.0
// @description  A browser tool managing bookmarks and page info
// @author       Ron Bravo
// @match        https://www.blender.org
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none0
// ==/UserScript==

(function() {
  'use strict';
  let dom;

  dom = document.createElement ('script');
  dom.src = 'http://localhost:2000/assets/index.js';
  dom.type = 'module';
  document.body.appendChild (dom);
})();

