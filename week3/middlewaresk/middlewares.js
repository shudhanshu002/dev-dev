const express = require('express');
let request = 0;

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

let requestCounter = (req,res,next) => {
    request++;
    next();
}

app.use(requestCounter);
app.get('/user',(req,res)=> {
    res.status(200).json({name: 'john'});
}) 

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function(req, res) {
  res.status(200).json({ request });
});

module.exports = app;