const express = require('express');
const router = express.Router();

const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');
const authenticate=require('../middleWare/authenticate');

router.get('/',authenticate ,(req, res) => {
    Book.find({}, (err, books) => {
        if (!err) res.send(books);
        else{
            res.send("an error occured");
        }
    });
});



router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    Book.findById(id, (err, book) => {
        if (!err){
            //res.send(book);
            var bname=book.name;
            const bookk={
                name:bname,
                authorName,
                catogryName,
                review,
            }

            Book.findById(id).populate('authId'),exec((err,authors)=>{
                bookk.authorName=authors.fname+authors.lname;
            });

            Book.findById(id).populate('catId'),exec((err,cats)=>{
                bookk.catogryName=cats.name;
            });

            res.send(bookk);
        }
        else{
            res.status(400).send("an error occured");
        }
    });
});




module.exports = router;