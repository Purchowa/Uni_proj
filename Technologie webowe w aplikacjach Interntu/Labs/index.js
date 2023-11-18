const express = require('express');
const config = require('./config').config;
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.json());

app.get('/', (request, response) => {
    response.render(__dirname + '/index.html', {subject: 'Technologie webowe :)'}); // Przekazywany obiekt to template
});

app.get('/template/:variant/:a/:b', (request, response) => {
    const operation = request.params.variant;
    const operands = {
        a: parseInt(request.params.a),
        b: parseInt(request.params.b)
    };

    let result = 0;
    switch (operation){
        case 'sum':{
            result = operands.a + operands.b;
            break;
        }
        case 'sub':{
            result = operands.a - operands.b;
            break;
        }
        case 'multiply':{
            result = operands.a * operands.b;
            break;
        }
        case 'divide':{
            result = operands.a / operands.b;
            break;
        }
        default:{
            response.send("Operation not found")
        }
    }
    response.render(__dirname + '/operations.html', {result: result.toString()});
});

app.listen(config.port, function () {
    console.info(`Server is running at port ${config.port}`);
 });