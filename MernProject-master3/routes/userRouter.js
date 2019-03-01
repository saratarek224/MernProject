const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const authenticate = require('../middleWare/authenticate');
const BookReview = require('../models/bookReview');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file');


router.get('/', (req, res) => {
  //   User.find({}, (err, books) => {
  //     if (!err) res.send(books);
  //     else{
  //         res.send("an error occured");
  //     }
  // });
});


//Login
router.post('/login', (req, res) => {
  console.log("heelo login");
  var body = _.pick(req.body, ['email', 'password']);
  console.log("heelo");
  User.findByEmail(body.email, body.password).then((user) => {
    console.log("heelo usre");
    return user.generateAuthToken().then((token) => {
      //  res.header('x-auth', token).send(user);
      //res.send({token});
      res.send({ token: token, user: user });
      console.log("heelo amar");
    });
  }).catch((e) => {
    console.log("heelo catxh");
    res.send("error");
  });

});

//signUP 
router.post('/create', (req, res) => {
  console.log("creatte");
  console.log(res.file);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    //    return res.status(200).send(req.file)
    console.log(req.file);
    var body = _.pick(req.body, ['fname', 'lname', 'email', 'password']);
    var user = new User(body);
    user.image = req.file.filename;
    // user.save().then(() => { 
    //   return user.generateAuthToken();
    // }).then((token) => {
    //   res.header('x-auth', token).send(user);
    // }).catch((e) => {
    //   res.status(400).send(e);
    // })

    user.save((err) => {
      if (!err) {

        console.log("sucess");
        res.send('user was saved');
      }
      else {
        console.log(err);
        console.log("err");
        res.send("an error occured");
      }
    })

  })



});
//logout
router.delete('/logout', authenticate, (req, res) => {

  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});




//search
router.get('/search', authenticate, (req, res) => {
  const input = req.body.name;
  Book.find({ name: input }, (err, book) => {
    if (!err) {
      Author.find({ fname: input }, (err, author) => {
        if (!err) {
          Catogry.find({ name: input }, (err, category) => {
            if (!err) {
              const obj = {
                books: book,
                authors: author,
                categories: category
              }
              res.send(obj);
            } else {
              res.send(err);
            }
          })
        } else {
          res.send(err);
        }
      })
    } else {
      res.send(err);
    }
  })

});

module.exports = router;
