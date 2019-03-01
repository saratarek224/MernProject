const express = require('express');
const router = express.Router();

const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');
const authenticate=require('../middleWare/authenticate');





router.get('/popular',(req,res)=>{
    Book.find({}).limit(1).sort('-avgRate').populate({path:'catId' 
    ,options: { limit: 1 }}).exec(function(err,cats){
        console.log(cats.catId);
        const cat=cats[0].catId;
        res.send(cat);
    })
})

router.get('/', authenticate, (req, res) => {
    Catogry.find({}, (err, cats) => {
        if (!err) res.send(cats);
        else{
            res.send("an error occured");
        }
    });
});


router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    console.log(id);
    Book.find({catId: id})
    .populate('catId')
    .populate('authId')
    .exec(function (err, books) {
        if(!err) {
            const allBooks = [];
            books.forEach(function (element) {
                const book = {
                    bookId: element._id,
                    authId: element.authId[0]._id,
                    bookImg:element.image,
                    bookName: element.name,
                    authName: element.authId[0].fname + element.authId[0].lname,
                    catId: element.catId[0].name
                }
                allBooks.push(book);
            })
            const obj = {
                catName : books[0].catId[0].name,
                myBooks : allBooks
            }
            res.send(obj);
        }
        else res.send(err);
    }); 
});


router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Book.deleteMany({catId: req.params.id}, (err) => {
        if(!err) {
            Catogry.deleteOne({_id: req.params.id}, (err) => {
                if(!err) res.send('Deleted');
                else res.send('unable to delete');
            })
        }
    })
})

module.exports = router;