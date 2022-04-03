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

// Implement a Root-Level Request Logger Middleware
app.use((req, res) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

// Serve Static Assets
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    const absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath);
})

// Serve JSON on a Specific Route
app.get('/json', (req, res) => {
    let message = "Hello json";
    res.json({
        "message": process.env.MESSAGE_STYLE == 'uppercase' ?
                    message.toUpperCase() : 
                    message
    })
})


module.exports = app;
