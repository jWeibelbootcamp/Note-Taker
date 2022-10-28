const router = require('express').Router();
const fs = require('fs');
const util = require('util');
// Call readFile and writeFile instead of fs.readFile and fs.writeFile - allows promise.
const readFile = util.promisify(fs.readFile); 
const writeFile = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require('uuid');

// queries notes from fs
function getNotes() {
    return readFile('db/db.json', 'utf-8')
        .then(rawNotes => [].concat(JSON.parse(rawNotes)))
};
router.get('/notes', (req, res) => {
    getNotes().then(notes => res.json(notes)).catch(err => res.json(err));
});

router.post('/notes', (req, res) => {
    getNotes().then(oldNotes => {
        let newNote = {title: req.body.title, text: req.body.text, id: uuidv4()};
        let updatedNotes = [...oldNotes, newNote];
        writeFile('db/db.json', JSON.stringify(updatedNotes)).then( () => res.json({ msg: 'ok.' })).catch(err => res.json(err));
    });
});

// UUID  to add id value to notes so i can delete them by id number. 
router.delete('/notes/:id', (req, res) => {
    getNotes().then(oldNotes => {
        var notesToSave = oldNotes.filter(note => note.id !== req.params.id);
        console.log(notesToSave);
        writeFile('db/db.json', JSON.stringify(notesToSave)).then( () => res.json({ msg: 'ok.' })).catch(err => res.json(err));
    });
});

module.exports = router;