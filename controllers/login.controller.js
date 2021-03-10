const express = require('express');
const jwt = require('jsonwebtoken');

const loginController = express.Router();

loginController.post('/', function(req, res) {
    const { user, pass } = req.body;
    if (user === 'abc' && pass === 'abc') {
        const token = jwt.sign({ user: 'abc' }, process.env.SECRET_KEY);
        return res.send(token);
    }
    return res.status(403).send();
});

module.exports = loginController;