var express = require('express');
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

/*
// Serve an HTML File
app.get('/', (req, res) => {
    const absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath);
})
*/

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
