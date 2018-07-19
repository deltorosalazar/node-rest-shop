const User = require('../routes/models/User')

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(422).json({
          message: 'Mail already exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })

            user.save()
              .then(user => {
                res.status(201).json({
                  message: 'User created',
                  user: user
                })
              })
              .catch(error => {
                res.status(500).json({
                  error: error
                })
              })
          }
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}

exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      console.log(user)
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Email or Password are wrong'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Email or Password are wrong',
            error: err
          })
        }
        if (result) {
          console.log('user', user)
          const token = jwt.sign(
            {
              email: user[0].email,
              id: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          )
          return res.status(200).json({
            message: 'Login Succesful',
            token: token
          })
        }
        res.status(401).json({
          message: 'Email or Password are wrong',
          error: err
        })
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}

exports.getAll = (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      res.status(200).json({
        users: users
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}

exports.deleteById = (req, res, next) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then(response => {
      res.status(200).json({
        message: 'User removed'
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}
