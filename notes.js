const fs = require('fs').promises;
const chalk = require('chalk');
const { writeFile } = require('fs');
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

const addNotes = async (title, body) => {
    const notes = await loadNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if(duplicateNote) {
        console.log(chalk.red.inverse('Note with same title already exists!'));
    } else {
        saveNotes([...notes, { title, body }]);
        console.log(chalk.green.inverse('Note added!'));
    }
}

const deleteNotes = async (title) => {
    const notes = await loadNotes();
    const updatedNotes = notes.filter(note => note.title !== title);
    if(updatedNotes.length === notes.length) {
        console.log(chalk.inverse.red('Note with given title doesnot exist!'));
    } else {
        saveNotes(updatedNotes);
        console.log(chalk.inverse.green('Note removed successfully!'));
    }
}

const listNotes = async () => {
    const notes = await loadNotes();
    console.log(chalk.inverse.white('Your Notes'));

    notes.forEach(note => {
        console.log(note.title);
    });
}

module.exports = {
    addNotes,
    deleteNotes,
    listNotes
};