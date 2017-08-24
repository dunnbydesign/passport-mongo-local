var express = require('express')
var router = express.Router()
var passport = require('passport')
var Account = require('../models/account')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express', user: req.user})
})

router.get('/register', function (req, res, next) {
  res.render('register', {})
})

router.post('/register', function (req, res, next) {
  Account.register(new Account({
    username: req.body.username
  }),
  req.body.password,
  function (err, account) {
    if (err) {
      return res.render('register', {info: 'User name is not available'})
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/')
    })
  })
})

router.get('/login', function (req, res, next) {
  res.render('login', {user: req.user})
})

router.post('/login', passport.authenticate('local'), function (req, res, next) {
  res.redirect('/')
})

router.get('/logout', function (req, res, next) {
  req.logout()
  res.redirect('/')
})

router.get('/ping', function (req, res, next) {
  res.status(200).send('pong!')
})

router.get('/login/twitter', passport.authenticate('twitter'))

router.get('/login/twitter/return',
  passport.authenticate('twitter', {failureRedirect: '/login'}),
  function (req, res, next) {
    res.redirect('/')
  })

module.exports = router
