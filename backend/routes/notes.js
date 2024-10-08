const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser")
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


// Route 1 get All the Notes using: GET "api/notes/getuser". Login requried 

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
// Route 2  Add a new Note using: POST "api/notes/addnote". Login requried 

router.post('/addnote', fetchuser, [
    body('title', 'Title a Valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {


            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    })
// Route 3 Update an existing Notes using: PUT "api/notes/updatenote". Login requried 

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note upated and update It
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// Route 4 Delete an existing Notes using: DELETE "api/notes/deletenote". Login requried 

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {


        // Find the note deleted and delete It
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router