const express = require('express');
const router = express.Router();
const authenticate=require('../middleWare/authenticate');
const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');


router.get('/', authenticate, (req, res) => {
    Author.find({}, (err, authors) => {
        if (!err) res.send(authors);
        else{
            res.send("an error occured");
        }
    });
});


// router.get('/:id', authenticate,(req, res) => {
//     const id = req.params.id;
//     Author.findById(id, (err, author) => {
//         if (!err) {
//             Book.find({authId:author._id},(err,books)=>{
//                 if(!err){
//                     const authorBooks={
//                         name:author.fname+author.lname,
//                         books:books,
//                     }
//                     res.send(authorBooks);
//                 }
//             });
//         }
//         else{
//             res.status(400).send("an error occured");
//         }
// }); 
// });

router.get('/:id', (req, res) => {
    const authorId1 = req.params.id;
    Author.findById(authorId1, (err, data) => {
        if(!err) {
            Book.find({authId: authorId1}, (err, output) => {
                if(!err){
                    const obj = {
                        authName: data.fname + data.lname,
                        dateOfBirth: data.dateOfBirth,
                        output: output
                    }
                    res.send(obj);
                }
            })
        }else{
            res.send(err);
        }
    })
})




module.exports = router;