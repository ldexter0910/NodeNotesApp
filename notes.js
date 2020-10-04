const fs = require('fs').promises;
const chalk = require('chalk');
const notesPath = `Notes.json`;

const loadNotes = async () => {
    try {
        return JSON.parse(await fs.readFile(notesPath));
    } catch(e) {
        return [];
    }
}

const saveNotes = async (notes) => {
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

const addNote = async (title, body) => {
    const notes = await loadNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if(duplicateNote) {
        console.log(chalk.red.inverse('Note with same title already exists!'));
    } else {
        saveNotes([...notes, { title, body }]);
        console.log(chalk.green.inverse('Note added!'));
    }
}

const deleteNote = async (title) => {
    const notes = await loadNotes();
    const updatedNotes = notes.filter(note => note.title !== title);
    if(updatedNotes.length === notes.length) {
        console.log(chalk.inverse.red('Note with given title doesnot exist!'));
    } else {
        saveNotes(updatedNotes);
        console.log(chalk.inverse.green('Note removed successfully!'));
    }
}

const updateNote = async (title, body) => {
    const notes = await loadNotes();
    const note = notes.find(note  => note.title === title);
    if(note) {
        note.body = body;
        saveNotes(notes);
        console.log(chalk.green.inverse('Note updated successfully!'));
    } else {
        console.log(chalk.red.inverse('Note with given title doesnot exist!'));
    }
}

const listNotes = async () => {
    const notes = await loadNotes();
    if(notes.length) {
        console.log(chalk.inverse.white('Your Notes'));
        notes.forEach(note => {
            console.log(note.title);
        });
    } else {
        console.log(chalk.inverse.white('No notes exist!'));
    }
}

const readNote = async (title) => {
    const notes = await loadNotes();
    const note = notes.find(note => note.title === title);
    if(note) {
        console.log(chalk.inverse.white('Your note : '));
        console.log(`Title: ${title}`);
        console.log(`Body: ${note.body}`);
    } else {
        console.log(chalk.inverse.red('Note with provided title not present!'));
    }
}

const removeAllNotes = () => {
    saveNotes([]);
    console.log(chalk.green.inverse('Cleared all successfully!'));
}

module.exports = {
    addNote,
    deleteNote,
    listNotes,
    readNote,
    updateNote,
    removeAllNotes
};