const express = require('express');
const router = express.Router();

const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');
const authenticate=require('../middleWare/authenticate');
const BookReview = require('../models/bookReview');

router.get('/',authenticate ,(req, res) => {
    Book.find({})
    .populate('authId')
    .exec(function (err, books) {
        if(!err) {
            const allBooks = [];
            books.forEach(function (element) {
                    const book = {
                        bookId: element._id,
                        authId: element.authId[0]._id,
                        bookName: element.name,
                        authName: element.authId[0].fname + element.authId[0].lname
                        // authName: element.authId[0].fname + element.authId[0].lname,
                        // catId: element.catId[0].name
                    } 
                
                allBooks.push(book);
            })
            res.send(allBooks);
        }
        else res.send(err);
    }); 
});



// router.get('/:id', authenticate, (req, res) => {
//     const id = req.params.id;
//     Book.findById(id, (err, book) => {
//         if (!err){
//             //res.send(book);
//             var bname=book.name;
//             var bookk={
//                 name:bname,
//                 authorName:'',
//                 catogryName:'',
//                 review:'',
//             }

//             Book.findById(id).populate('authId').exec((err,authors)=>{
//                 //bookk.authorName=authors[0].fname+authors[0].lname;
//             });

//             Book.findById(id).populate('catId').exec((err,cats)=>{
//                 bookk["catogryName"]=cats.name;
//                 res.send(bookk);
//             });

            
//         }
//         else{
//             res.status(400).send("an error occured");
//         }
//     });
// });


router.get('/:id', (req, res) => {
    const bookId1 = req.params.id;
    Book.findById(bookId1)
    .populate('authId')
    .populate('catId')
    .exec(function(err, data){
        if(!err) {
            BookReview.find({bookId: bookId1}, (err, output) => {
                if(!err){
                    const obj = {
                        authId: data.authId[0]._id,
                        authName: data.authId[0].fname + data.authId[0].lname,
                        catId: data.catId[0]._id,
                        catName: data.catId[0].name,
                        bookName: data.name,
                        avgRate: data.avgRate,
                        review: output[0].review
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