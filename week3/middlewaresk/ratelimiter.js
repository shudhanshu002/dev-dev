// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

const express = require('express');
const app = express();

let numberOfRequest = {};

// Reset every 1 second
setInterval(() => {
    numberOfRequest = {};
}, 1000);

let rateLimiter = (req, res, next) => {
    const userId = req.headers['user-id'];

    numberOfRequest = {
        ...numberOfRequest,
        [userId]: numberOfRequest[userId] ? numberOfRequest[userId] + 1 : 1
    };

    if (numberOfRequest[userId] > 5) {
        res.status(404).json({ msg: 'Too many requests' });
    } else {
        next();
    }
};

app.use(rateLimiter);

app.get('/user', (req, res) => {
    res.status(200).json({ name: 'json' });
});

app.post('/user', (req, res) => {
    res.status(202).json({ msg: 'created dummy user' });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
