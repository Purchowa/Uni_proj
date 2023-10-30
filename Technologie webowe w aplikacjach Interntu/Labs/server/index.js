const express = require('express');
let questions = require('./questions').questions;
const config = require('./config').config;

const app = express();
app.use(express.json()) 

app.get('/api/questions/', (request, response) => {
    response.send(questions);
});

app.get('/api/questions/:id', (request, response) => {
    const id = request.params.id;
    response.send( id < 0 || questions.length <= id ? 'Index out of range' : questions[id]);
})

app.post('/api/question/', (request, response) => {
    questions.push({}); // TODO
});

app.listen(config.port, function () {
    console.info(`Server is running at port ${config.port}`);
});