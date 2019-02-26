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

// router.get('/:id', authenticate,(req, res) => {
//     const id = req.params.id;
//     var bookk='';
//     var author;
//     Catogry.findById(id, (err, cat) => {
//         if (!err) {
//             var catn={
//                 name:cat.name,
//                 book:'',
//                 author:'',
//             }

//             Book.find({catId:cat._id},(err,books)=>{
//                 if(!err){
//                     //console.log(books[0].name);
//                     bookk=books[0].name;
//                     catn["book"]=bookk;
//                     //console.log('book'+catn["book"]);
//                     Book.findById(books._id).populate('authId').exec((err,authors)=>{
//                             catn["author"]=authors[0].fname+authors[0].lname;
//                         });
                    
//                 }
//                 res.send(catn);
//             });
            
          
            
//         }
//         else{
//             res.send("an error occured");
//         }
//     });


   
// });


router.get('/:id', (req, res) => {
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
                    bookName: element.name,
                    authName: element.authId[0].fname + element.authId[0].lname,
                    // catId: element.catId[0].name
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

module.exports = router;