const express = require('express');
const router = express.Router();
const authenticate=require('../middleWare/authenticate');
const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');


router.get('/popular',(req,res)=>{
    Book.find({}).limit(1).sort('-avgRate').populate({path:'authId' 
    ,options: { limit: 1 }}).exec(function(err,auth){
       // console.log(cats.catId);
        const author=auth[0].authId;
        res.send(author);
    })
})


router.get('/', authenticate, (req, res) => {
    Author.find({}, (err, authors) => {
        if (!err) res.send(authors);
        else{
            res.send("an error occured");
        }
    });
});


router.get('/:id', authenticate,(req, res) => {
    const authorId1 = req.params.id;
    Author.findById(authorId1, (err, data) => {
        if(!err) {
            Book.find({authId: authorId1}, (err, output) => {
                if(!err){
                    const obj = {
                        authName: data.fname + data.lname,
                        authImg:data.image,
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


router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Book.deleteMany({authId: req.params.id}, (err) => {
        if(!err) {
            Author.deleteOne({_id: req.params.id}, (err) => {
                if(!err) res.send('Deleted');
                else res.send('unable to delete');
            })
        }
    })
})



module.exports = router;