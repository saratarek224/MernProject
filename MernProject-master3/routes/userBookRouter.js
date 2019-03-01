const express = require('express');
const router = express.Router();
const authenticate=require('../middleWare/authenticate');
const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');
const UserBook = require('../models/userBooks');
const BookReview = require('../models/bookReview');

router.post('/', authenticate, (req, res) => {
    const userId1 = req.user._id;
    const bookId1 = req.body.bookId;
    const rate1 = req.body.rate;
    const status1 = req.body.status;

    const userBook = new UserBook({
        userId: userId1,
        bookId: bookId1,
        rate: rate1,
        status: status1
    });

    userBook.save((err) => {
        if(!err) res.send('User Book created successfully');
        else res.send('Error while saving');
    })
});

router.get('/', authenticate,(req, res) => {
    console.log("in ttt");
    UserBook.find({userId: req.user._id})
    .populate({path: 'bookId' , populate:{path:'authId'}})
    .exec(function(err, data){
        if(!err){
          //  console.log(data);
            const myData = [];
           console.log(data);
            if(data.length >0)
            {
                console.log(data);
            data.forEach(function(element){
                console.log(element);
                console.log(element.bookId[0]);
                //console.log(element.bookId[0].authId[0]._id);
                const obj = {
                    bookId: element.bookId[0]._id,
                    bookImg: element.bookId[0].image,
                    bookName: element.bookId[0].name,
                    avgRate: element.bookId[0].avgRate,
                    authId: element.bookId[0].authId[0]._id,
                    authName: element.bookId[0].authId[0].fname + element.bookId[0].authId[0].lname,
                    rate: element.rate,
                    status: element.status
                }
                myData.push(obj);
            })
        }
            res.send(myData); 
        } else{
            res.send(err);
        }
    })
})

router.get('/read', authenticate,(req, res) => {
    UserBook.find({userId: req.user._id})
    .populate({path: 'bookId' , populate:{path:'authId'}})
    .exec(function(err, data){
        if(!err){
            const myData = [];
            
            data.forEach(function(element){
                if(element.status == "Read"){
                const obj = {
                    bookId: element.bookId[0]._id,
                    bookImg: element.bookId[0].image,
                    bookName: element.bookId[0].name,
                    avgRate: element.bookId[0].avgRate,
                    authId: element.bookId[0].authId[0]._id,
                    authName: element.bookId[0].authId[0].fname + element.bookId[0].authId[0].lname,
                    rate: element.rate,
                    status: element.status[0]
                }
                myData.push(obj);
                }
            })
            res.send(myData);
        } else{
            res.send(err);
        }
    })
})

router.get('/cread', authenticate, (req, res) => {
    UserBook.find({userId: req.user._id})
    .populate({path: 'bookId' , populate:{path:'authId'}})
    .exec(function(err, data){
        if(!err){
            const myData = [];
            
            data.forEach(function(element){
                if(element.status == "Currently Reading"){
                const obj = {
                    bookId: element.bookId[0]._id,
                    bookImg: element.bookId[0].image,
                    bookName: element.bookId[0].name,
                    avgRate: element.bookId[0].avgRate,
                    authId: element.bookId[0].authId[0]._id,
                    authName: element.bookId[0].authId[0].fname + element.bookId[0].authId[0].lname,
                    rate: element.rate,
                    status: element.status[0]
                }
                myData.push(obj);
                }
            })
            res.send(myData);
        } else{
            res.send(err);
        }
    })
})

router.get('/wread', authenticate,(req, res) => {
    console.log("wread");
    UserBook.find({userId: req.user._id})
    .populate({path: 'bookId' , populate:{path:'authId'}})
    .exec(function(err, data){
        if(!err){
            var myData = [];
            
            data.forEach(function(element){
                console.log(element);
                if(element.status == "Want To Read"){
                    console.log(element);
                const obj = {
                    bookId: element.bookId[0]._id,
                    bookImg: element.bookId[0].image,
                    bookName: element.bookId[0].name,
                    avgRate: element.bookId[0].avgRate,
                    authId: element.bookId[0].authId[0]._id,
                    authName: element.bookId[0].authId[0].fname + element.bookId[0].authId[0].lname,
                    rate: element.rate,
                    status: element.status[0]
                }
                console.log(obj);
                myData.push(obj);

                }
            })
            console.log(myData);
            res.send(myData);
        } else{
            res.send(err);
        }
    })
})

// router.put('/rate/:id',authenticate, (req, res) => {
//     const userId1 = req.user._id;
//     const bookId1 = req.params.id;
//     const rate1 = req.body.rate;
//     UserBook.updateOne({userId: userId1, bookId: bookId1}, { $set: {rate: rate1} }, (err) => {
//         if (!err) res.send('Rate updated');
//         else{
//             res.send("an error occured");
//         }
//     });
// });

router.put('/rate/:id', authenticate, (req, res) => {
    const userId1 = req.user._id;
    const bookId1 = req.params.id;
    const rate1 = req.body.rate;
    UserBook.find({userId: userId1, bookId: bookId1}, (err, data) => {
        if(!err){
            if(data.length === 0){
                const obj = new UserBook({
                    userId: req.user._id,
                    bookId: req.params.id,
                    rate: req.body.rate
                })
                obj.save((err) => {
                    if(!err) {
                        Book.calcAvgRate(bookId1).then((avgRate1)=>{
                            Book.updateOne({ _id: bookId1 }, { $set: { avgRate: avgRate1 } }, (err) => {
                                if (!err) res.send('Done');
                                else res.send("First Error")
                            }) 
                        });
                    } 
                });
            } else{
                UserBook.updateOne({ userId: userId1, bookId: bookId1 }, { $set: { rate: rate1 } }, (err) => {
                    if (!err) {
                        Book.calcAvgRate(bookId1).then((avgRate1)=>{
                            Book.updateOne({ _id: bookId1 }, { $set: { avgRate: avgRate1 } }, (err) => {
                                if (!err) res.send('Done');
                                else res.send("First Error")
                            }) 
                        });
                      
                    }
                    else {
                        res.send("an error occured");
                    }
                });
            }
        } else {
            res.send('Error');
        }
    })
})

// router.post('/status/:id',authenticate, (req, res) => {
//     console.log("hhhht5");
//     const userId1 = req.user._id;
//     const bookId1 = req.params.id;
//     const status1 = req.body.status;
//     const userBook =new UserBook({
//         userId:userId1,
//         bookId:bookId1,
//         status:status1,
//         rate:0
//     });
//     console.log(userId1);
//     console.log(bookId1);
//     console.log(status1);
//     UserBook.updateOne({userId: userId1, bookId: bookId1}, { $set: {status: status1} }, (err) => {
//         if (!err) res.send('Status updated');
//         else{
//             res.send("an error occured");
//         }
//     });
//     // userBook.save((err)=>{
//     //     if(!err) res.send('status updated');
//     //     else{
//     //         res.send("an error occured");
//     //     }
//     // })

// });

// router.put('/status/:id', authenticate, (req, res) => {
//     const userId1 = req.user._id;
//     const bookId1 = req.params.id;
//     const status1 = req.body.status;
//     UserBook.find({userId: userId1, bookId: bookId1}, (err, data) => {
//         if(!err){
//             if(data.length === 0){
//                 const obj = new UserBook({
//                     userId: req.user._id,
//                     bookId: req.params.id,
//                     status: req.body.status,
//                     rate: req.body.rate
//                 })
//                 obj.save((err) => {
//                     if(err) res.send('Error'); 
//                 });
//             } else{
//                 UserBook.updateOne({ userId: userId1, bookId: bookId1 }, { $set: { status: status1 } }, (err) => {
//                             if (!err) res.send('Status updated');
//                             else {
//                                 res.send("an error occured");
//                             }
//                         });
//             }
//         } else {
//             res.send('Error');
//         }
//     })
// })

router.put('/status/:id', authenticate, (req, res) => {
    const userId1 = req.user._id;
    const bookId1 = req.params.id;
    const status1 = req.body.status;
    UserBook.find({userId: userId1, bookId: bookId1}, (err, data) => {
        if(!err){
            if(data.length === 0){
                const obj = new UserBook({
                    userId: req.user._id,
                    bookId: req.params.id,
                    status: req.body.status
                })
                obj.save((err) => {
                    if(err) res.send('Error'); 
                });
            } else{
                UserBook.updateOne({ userId: userId1, bookId: bookId1 }, { $set: { status: status1 } }, (err) => {
                            if (!err) res.send('Status updated');
                            else {
                                res.send("an error occured");
                            }
                        });
            }
        } else {
            res.send('Error');
        }
    })
})



router.post('/bookReview/:id', authenticate, (req, res) => {
    const userId1 = req.user._id;
   
    const bookId1 = req.params.id;
    const review1 = req.body.review;
    console.log(userId1);
    console.log(bookId1);
    console.log(review1);
    const bookReview = new BookReview({
        userId: userId1,
        bookId: bookId1,
        review: review1,
    });
    bookReview.save((err) => {
        if (!err) res.send('bookReview was saved');
        else{
            res.send("an error occured");
        }
    })
});




module.exports = router;