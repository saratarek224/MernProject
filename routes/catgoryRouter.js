const express = require('express');
const router = express.Router();

const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');
const authenticate=require('../middleWare/authenticate');

router.get('/', authenticate, (req, res) => {
    Catogry.find({}, (err, cats) => {
        if (!err) res.send(cats);
        else{
            res.send("an error occured");
        }
    });
});

router.get('/:id', authenticate,(req, res) => {
    const id = req.params.id;
    Catogry.findById(id, (err, cat) => {
        if (!err) {
            const catn={
                name:cat.name,
                book,
                author,
            }

            Book.find({catId:cat._id},(err,books)=>{
                if(!err){
                    catn.book=books.name;
                    
                }

            });
            res.send(catn);
        }
        else{
            res.send("an error occured");
        }
    });
});


module.exports = router;