const express = require('express');
const router = express.Router();

const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');


router.get('/', (req, res) => {
    Book.find({}, (err, books) => {
        if (!err) res.send(books);
        else{
            res.send("an error occured");
        }
    });
});



router.get('/:id', (req, res) => {
    const id = req.params.id;
    Book.findById(id, (err, book) => {
        if (!err) res.send(book);
        else{
            res.send("an error occured");
        }
    });
});





module.exports = router;