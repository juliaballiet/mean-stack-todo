// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const toDoRouter = require('./modules/routes/todo.router');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/todo'

mongoose.connect(mongoURI, {useNewUrlParser: true});

mongoose.connection.on('open', () => {
    console.log('connected to Mongo');
});
mongoose.connection.on('error', () => {
    console.log('error connecting: ', error);
});

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/todo', toDoRouter);

// spin up server
app.listen(PORT, () => {
    console.log('server up on: ', PORT);
})