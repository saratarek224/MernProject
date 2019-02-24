const express = require('express');
const router = express.Router();

const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');


router.get('/', (req, res) => {
    Catogry.find({}, (err, cats) => {
        if (!err) res.send(cats);
        else{
            res.send("an error occured");
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Catogry.findById(id, (err, cat) => {
        if (!err) res.send(cat);
        else{
            res.send("an error occured");
        }
    });
});


module.exports = router;