const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const PORT = 15500;
const myServer = express();

const loginCtrl = require('./controllers/login.controller');
const companyCtrl = require('./controllers/crm.controller');

process.env.SECRET_KEY = 'crmpass';


myServer.use(bodyParser.json());
myServer.use(express.static('client'));
const guestRoutes = ['/login'];

myServer.use(function(req, res, next) {
    if (guestRoutes.indexOf(req._parsedUrl.pathname) > -1) {
        return next();
    }
    if (!req.headers.authorization) return res.status(401).send();

    const [tokenType, userToken] = req.headers.authorization.split(' ');

    if (tokenType === 'Bearer') {
        try {
            jwt.verify(userToken, process.env.SECRET_KEY);
            console.log(jwt.decode(userToken));
            next();
        } catch (ex) {
            return res.status(401).send(ex);
        }
    }
    return res.status(401).send();
});