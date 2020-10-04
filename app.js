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
});

yargs.command({
    command: 'delete',
    description: 'Delete note',
    builder: {
        'title': {
            describe: 'Title of the note used to delete that particular note if present [unique]',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        notes.deleteNotes(argv.title);
    }
});

yargs.command({
    command: 'list',
    description: 'List note titles',
    handler: () => {
        notes.listNotes();
    }
})

yargs.parse();
