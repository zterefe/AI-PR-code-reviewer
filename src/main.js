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