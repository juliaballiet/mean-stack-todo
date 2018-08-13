// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./modules/database-connection')
const toDoRouter = require('./modules/routes/todo.router');
const PORT = process.env.PORT || 5000;

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/todo', toDoRouter);

// spin up server
app.listen(PORT, () => {
    console.log('server up on: ', PORT);
})