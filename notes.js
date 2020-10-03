const fs = require('fs').promises;
const chalk = require('chalk');
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

module.exports = {
    addNotes
};