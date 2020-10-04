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
        notes.addNote(argv.title, argv.body);
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
        notes.deleteNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    description: 'List note titles',
    handler: () => {
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    description: 'Read the note according to the provided title',
    builder: {
        'title': {
            describe: 'Title of the note used to read that particular note',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    }
});

yargs.command({
    command: 'update',
    description: 'Update a particular note',
    builder: {
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
        notes.updateNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'clear',
    description: 'Clear all existing notes',
    handler: () => {
        notes.removeAllNotes();
    }
});

yargs.parse();
