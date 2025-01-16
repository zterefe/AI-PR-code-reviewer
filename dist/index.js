/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
const core = require('@actions/core');

try {
    const name = core.getInput('name');
    const greeting = `Hello, ${name}`;

    core.setOutput('greeting', greeting);

    console.log('Printing result');
    console.log(greeting);
} catch(error) {
    core.setFailed(error.message);
}
