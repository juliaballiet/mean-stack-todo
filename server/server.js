// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo'
const toDoRouter = require('./modules/routes/todo.router');
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI, {useNewUrlParser: true});

mongoose.connection.on('open', () => {
    console.log('connected to Mongo');
});
mongoose.connection.on('error', (error) => {
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