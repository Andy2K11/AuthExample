var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../middleware/auth');
const jwt = require('jsonwebtoken');

/* GET users listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
// });

router.get('/', passport.authenticate('jwt', { session: false} ), (req, res, next) => {
    if (req.user !== 'guest') {
        return res.status(401).send('Access level denied');
    }
    res.send('respond with a resource');
});

router.get('/admin', passport.authenticate('jwt', { session: false} ), (req, res, next) => {
    if (req.user !== 'admin') {
        return res.status(401).send('Access level denied');
    }
    res.send('respond with admin resource');
});

router.get('/test', (req, res, next) => {
    console.log(req.cookies);
    res.cookie('token', 'abcd123', {
        httpOnly: true,
        secure: false
    });
    res.json({
        message: 'test'
    });
});

router.post('/login', function(req, res, next) {
    const payload = {
        sub: {
            email: req.body.email,
            access: 'guest'
        }
    };
    const secret = "secret";    // make it secure and not stored in codebase, e.g. pulled in from pem key
    const opts = {
        expiresIn: 2 * 60 * 60,
        issuer: 'jwt.example.com',
        audience: 'localhost'
    };      // expires in 2 hours, all fields are validated by passport-jwt

    jwt.sign(payload, secret, opts, (err, token) => {
        if (err) {
            console.error(err);
            return res.status(500).json(req.body);
        }
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            withCredentials: true
        });
        res.json({
            message: "ok"
        });
    });
});

module.exports = router;
