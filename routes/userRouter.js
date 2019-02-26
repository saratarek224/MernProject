const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const authenticate=require('../middleWare/authenticate');
const BookReview = require('../models/bookReview');
 



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
const parser = multer({ storage: storage });



router.post('/image', parser.single("image"), (req, res) => {
  console.log(req.file);
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  User.image.create(image) 
    .then(newImage => res.json(newImage))
    .catch(err => console.log(err));
});



router.get('/', (req, res) => {
//   User.find({}, (err, books) => {
//     if (!err) res.send(books);
//     else{
//         res.send("an error occured");
//     }
// });
});


//Login
router.post('/login',(req,res)=>{
  console.log("heelo login");
  var body = _.pick(req.body,['email','password']);  
  console.log("heelo");
  User.findByEmail(body.email,body.password).then((user)=>{
    console.log("heelo usre");
   return user.generateAuthToken().then((token)=>{
    res.header('x-auth', token).send(user);
    console.log("heelo amar");
   });
  }).catch((e)=>{
    console.log("heelo catxh");
    res.status(400).send(e);
  }); 
  
});
 
//signUP 
router.post('/create', (req, res) => {
    var body = _.pick(req.body,['fname','lname','email','password']);
    var user = new User(body);
  
    user.save().then(() => { 
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })

  });
//logout
router.delete('/logout', authenticate,(req, res) => {
    
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
});

router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
  });

  router.post('/bookReview', authenticate, (req, res) => {
    const userId1 = req.body.userId;
    const bookId1 = req.body.bookId;
    const review1 = req.body.review;
    console.log(review1);
    const bookReview = new BookReview({
        userId: userId1,
        bookId: bookId1,
        review: review1,
    });
    bookReview.save((err) => {
        if (!err) res.send('bookReview was saved');
        else{
            res.send("an error occured");
        }
    })
});
 
  
module.exports = router;