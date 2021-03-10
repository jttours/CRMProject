const express = require('express');
const jwt = require('jsonwebtoken');

const myServer = express();
const loginController = express.Router();

myServer.post('/', function(req, res) {
    const { username, password } = req.body;
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);

        res.json({
            token
        });
    } else {
        res.status(403).send();
    }
});

module.exports = loginController;