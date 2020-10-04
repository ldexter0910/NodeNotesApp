const fs = require('fs').promises;
const chalk = require('chalk');
const { writeFile } = require('fs');
const notesPath = `Notes.json`;

const getNotes = async () => {
    try {
        return JSON.parse(await fs.readFile(notesPath));
    } catch {
        return [];
    }
}

const addNotes = async (title, body) => {
    const notes = await getNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if(duplicateNote) {
        console.log(chalk.red.inverse('Note with same title already exists!'));
    } else {
        const notesContent = JSON.stringify([...notes, { title, body }]);
        await fs.writeFile(notesPath, notesContent);
        console.log(chalk.green.inverse('Note added!'));
    }
}

const deleteNotes = async (title) => {
    const notes = await getNotes();
    const updatedNotes = notes.filter(note => note.title !== title);
    if(updatedNotes.length === notes.length) {
        console.log(chalk.inverse.red('Note with given title doesnot exist!'));
    } else {
        await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
        console.log(chalk.inverse.green('Note removd successfully!'));
    }
}

module.exports = {
    addNotes,
    deleteNotes
};