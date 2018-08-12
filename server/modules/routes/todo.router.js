// requires
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const ToDoSchema = new Schema ({
    task: {type: String},
    completed: {type: Boolean, default: false}
});

const ToDo = mongoose.model('ToDoList', ToDoSchema);

// routes

router.get('/', (req, res) => {
    ToDo.find({}).then((found) => {
        res.send(found);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    let toDoItemFromClient = req.body;
    const toDoItem = new ToDo(toDoItemFromClient);
    toDoItem.save().then((response) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    ToDo.findByIdAndRemove(req.params.id).then((response) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

router.put('/complete/:id', (req, res) => {
    ToDo.findById(req.params.id).then((found) => {
        found.completed = true;
        found.save().then((response) => {
            res.sendStatus(201);
        })
    }).catch((error) => {
        res.sendStatus(500);
    })
})

module.exports = router;