const express = require('express');
const router = express.Router();

const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');
const authenticate=require('../middleWare/authenticate');
const BookReview = require('../models/bookReview');


router.get('/popular',(req,res)=>{
    Book.find({}).limit(5).sort('-avgRate').exec(function(err,books){
        res.send(books);
    })
})
router.get('/',authenticate ,(req, res) => {
   
    Book.find({})
    .populate('authId')
    .exec(function (err, books) {
        if(!err) {
            const allBooks = [];
            books.forEach(function (element) {
                console.log(element);
                console.log("in loop");
                    const book = {
                        bookId: element._id,
                        authId: element.authId[0]._id,
                        bookName: element.name,
                        bookImg:element.image,
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









router.get('/:id', authenticate,(req, res) => {
    console.log("in");
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
                        bookId: data._id,
                        bookName: data.name,
                        bookImg:data.image,
                        avgRate: data.avgRate,
                        review: output
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