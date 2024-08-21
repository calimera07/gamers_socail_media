let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let Posts = require('../models/Post')
let Articles = require('../models/Article')
let User = require('../models/User')

//get all posts

router.route('/').get((req, res, next) => {
  Posts.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})


//delete post

router.route('/delete/:id').delete((req, res, next) => {
  Posts.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

//get all items

router.route('/article').get((req, res, next) => {
  Articles.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

//get all users

router.route('/users').get((req, res, next) => {
  User.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})


// delete user

router.route('/user/delete/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


// delete item

router.route('/article/delete/:id').delete((req, res, next) => {
  Articles.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = router;