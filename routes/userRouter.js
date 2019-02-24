const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

var {authenticate}=require('../middleWare/authenticate');
 
// router.get('/:id', (req, res) => {
//     const id = req.params.id;
//     User.findOne({_id: id}, (err, user) => {
//         if(!err) res.send(user);
//         else res.send(err);
//     });
// });

router.get('/', (req, res) => {
    
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

router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
  });
 
  


// router.post('/:isAdmin', (req, res) => {
//     const tfname = req.body.fname;
//     const tlname = req.body.lname;
//     const temail = req.body.email;
//     const tpassword = req.body.password;
//     const timage = req.body.image;
//     const tisAdmin = req.params.isAdmin;
//     const user = new User({
//         fname: tfname,
//         lname: tlname,
//         email: temail,
//         password: tpassword,
//         image: timage,
//         isAdmin: tisAdmin
//     });
//     user.save((err) => {
//         if(!err) res.send("User was saved successfully");
//         else res.send("Error while saving");
//     });
// });

// router.put('/:id',(req, res) => {
//     const tfname = req.body.fname;
//     const tlname = req.body.lname;
//     const temail = req.body.email;
//     const tpassword = req.body.password;
//     const timage = req.body.image;
//     const id = req.params.id;
//     User.updateOne({_id:id}, { $set: {fname: tfname, lname: tlname, email: temail, password: tpassword, image: timage} }, (err) => {
//         if(!err) res.send("Updated Successfully");
//         else res.send("Failed to update");
//     })
// })

// router.delete('/:id', (req, res) => {
//     const id = req.params.id;
//     User.deleteOne({ _id: id }, (err) => {
//         if (!err) res.send('Deleted Successfully');
//         else{
//             res.send("Error Occured");
//         }
//     })
// })

module.exports = router;