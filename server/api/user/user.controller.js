'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mail = require('../../mail');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.createGuest = function (req, res, next) {

  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;

  User.findOne({email: email}, function(err, user){

    if (user) res.send(401);

      var guestSessionToken = jwt.sign({email: email, name : name, role : 'guest' , password: password }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.json({ token: guestSessionToken });

      var mailConfirmationToken = jwt.sign({name : req.body.name, email: req.body.email,  password: req.body.password }, config.secrets.mailConfirmation, {expiresInMinutes: 60 * 24 * 30});

      mail.userConfirmation.sendMail(req.body.name, req.body.email, mailConfirmationToken, null);
  });
};

  /**
 * Confirm mail address
 */
 exports.createUser = function(req, res, next) {


  var mailConfirmationToken = req.param('mailConfirmationToken');

  jwt.verify(mailConfirmationToken, config.secrets.mailConfirmation, function(error, data) {

    if (error) return res.send(403);

    if (data.exp < Date.now()) return res.send(403);

    User.findOne({email: data.email}, function(error, user){
      if (error) return res.send(403);
      if (user) return res.send(403);

      var newUser = new User(data);
      newUser.provider = 'local';
      newUser.role = 'user';
      newUser.confirmedEmail = true;

      newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
      });

    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  if (req.user.role==='guest') {
    var user = req.user;
    delete user.password;
    return res.json(user)
  };
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
