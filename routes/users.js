var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../middleware/auth');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');

const User = require('../models/User');
const csrf = require('../middleware/csrf');

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
    res.json({
        message: 'respond with admin resource',
        access: req.user
    });
});

router.post('/test', csrf, passport.authenticate('jwt', { session: false} ), (req, res, next) => {
    res.json({
        message: 'test successful'
    });
});

router.post('/register', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level
    });
    user.save((err, result) => {
        if (err) {
            return res.json({
                error: err.message
            });
        }
        return res.json({
            message: "ok"
        });
    });
});

router.post('/login', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const secret = fs.readFileSync('keys/ec');
    const opts = {
        expiresIn: 2 * 60,
        issuer: 'jwt.example.com',
        audience: 'localhost',
        algorithm: 'ES512'
    };      // expires in 2 hours, all fields are validated by passport-jwt

    User.findOne({email}, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!result) {
            return res.status(401).json({
                error: 'Invalid username or password'
            });
        }
        bcrypt.compare(password, result.password).then(success => {
            if (!success) {
                return res.status(401).json({
                    error: 'Invalid username or password'
                });
            }
            const payload = {
                sub: {
                    username: result.username,
                    access: result.level
                }
            };
            jwt.sign(payload, secret, opts, (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json(req.body);
                }
                res.cookie('XSRF-TOKEN', crypto.randomBytes(64).toString('hex'), {
                    httpOnly: false,
                    maxAge: 20 * 1000,
                    secure: true,
                    sameSite: true
                });
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: opts.expiresIn * 1000,
                    secure: true,
                    sameSite: true
                });
                res.json({
                    message: "ok",
                    username: result.username
                });
            });
        }).catch(err => res.status(500).json({error: err.message}));
    });
});

module.exports = router;
