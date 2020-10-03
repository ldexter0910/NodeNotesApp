const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
    command: 'add',
    description : 'Add note',
    builder : {
        'title': {
            type: 'string',
            describe: 'Title of the note [unique]',
            demandOption: true
        },
        'body' : {
            describe: 'Body of the note [not unique]',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        notes.addNotes(argv.title, argv.body);
    }
}).argv;
