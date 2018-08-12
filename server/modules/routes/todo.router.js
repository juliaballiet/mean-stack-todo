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



module.exports = router;