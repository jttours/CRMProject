const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const PORT = 15500;
const myServer = express();

const users = [{
    username: 'omar1',
    password: 'admin123',
    role: 'admin'
}, {
    username: 'omar2',
    password: 'member123',
    role: 'member'
}];

const contacts = [{
    Id: 1,
    Name: 'Yaakov',
    Email: 'kobieshka@gmail.com',
    Phone: '054-7974202',
    CompanyID: 1
}];

const companies = [{
    Id: 1,
    Name: 'John Bryce',
    Country: 'Israel'
}];


const loginCtrl = require('./controllers/login.controller');
//const companyCtrl = require('./controllers/company.controller');

SECRET_KEY = 'crmpass';


myServer.use(bodyParser.json());
myServer.use(express.static('client'));
//const guestRoutes = ['/login'];

myServer.post('/login', function(req, res) {
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

myServer.get('/contact', function(req, res) {
    const [tokenType, userToken] = req.headers.authorization.split(' ');
    console.log(tokenType, userToken);
    if (tokenType === 'Bearer') {
        console.log('user TOKEN - ', userToken);

        try {
            jwt.verify(userToken, SECRET_KEY);
            res.send(contacts);

        } catch (ex) {
            return res.status(401).send(ex);
        }

    }

    return res.status(401).send();

})

// myServer.use(function(req, res, next) {
//     if (guestRoutes.indexOf(req._parsedUrl.pathname) > -1) {
//         return next();
//     }
//     if (!req.headers.authorization) return res.status(401).send();

//     const [tokenType, userToken] = req.headers.authorization.split(' ');

//     if (tokenType === 'Bearer') {
//         try {
//             jwt.verify(userToken, process.env.SECRET_KEY);
//             console.log(jwt.decode(userToken));
//             next();
//         } catch (ex) {
//             return res.status(401).send(ex);
//         }
//     }
//     return res.status(401).send();
// });


// myServer.use('/login', loginCtrl);


myServer.listen(PORT, () => console.log(`server started at ${PORT}`));