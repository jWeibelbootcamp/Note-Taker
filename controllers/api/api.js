const router = require('express').Router();
const fs = require('fs');
const util = require('util');
// Call readFile and writeFile instead of fs.readFile and fs.writeFile - allows promise.
const readFile = util.promisify(fs.readFile); 
const writeFile = util.promisify(fs.writeFile);

// queries notes from fs
function getNotes() {
    return readFile('db/db.json', 'utf-8')
        .then(rawNotes => [].concat(JSON.parse(rawNotes)))
};
router.get('/notes', (req, res) => {
    getNotes().then(notes => res.json(notes));

});

router.post('/notes', (req, res) => {
    getNotes().then(oldNotes => {
        let newNote = {title: req.body.title, text: req.body.text};
        let updatedNotes = [...oldNotes, newNote];
        writeFile('db/db.json', JSON.stringify(updatedNotes)).then( () => res.json({ msg: 'ok.' }));
    });
});

// UUID  to add id value to notes so i can delete them by id number. 


module.exports = router;