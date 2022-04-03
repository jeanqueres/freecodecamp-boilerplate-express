var express = require('express');
require('dotenv').config();
var app = express();

/* 
// Meet the Node console
console.log("Hello World");
*/

/*
// Start a Working Express Server
app.get('/', (req, res) => {
    res.send('Hello Express');
})
*/

// Serve Static Assets
app.use('/public', express.static(__dirname + '/public'));

// Implement a Root-Level Request Logger Middleware
app.use(function middleware(req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

app.get('/', (req, res) => {
    const absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath);
});

// Serve JSON on a Specific Route
app.get('/json', (req, res) => {
    let message = "Hello json";
    res.json({
        "message": process.env.MESSAGE_STYLE == 'uppercase' ?
                    message.toUpperCase() : 
                    message
    })
});

// Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({time: req.time});
});

// Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res, next) => {
    res.json({'echo': req.params.word});   
})

// Get Query Parameter Input from the Client
app.route('/name')
.get((req, res, next) => {
    let data = req.query;
    res.json({'name': data.first + ' ' + data.last});
})

module.exports = app;
