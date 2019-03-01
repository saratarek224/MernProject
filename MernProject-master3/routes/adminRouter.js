const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Admin = require('../models/user');
const Catogry = require('../models/catogry');
const Book = require('../models/book');
const Author = require('../models/author');
const authenticate=require('../middleWare/authenticate');

const multer = require("multer");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file');
router.get('/', authenticate,(req, res) => {
    Catogry.find({}, (err, cats) => {
        if (!err) res.send(cats);
        else{
            res.send("an error occured");
        }
    });
});


//Login
//Login
router.post('/login', (req, res) => {
    var body = _.pick(req.body,['email','password']);  
    console.log(body.email);
    console.log(body.password);
Admin.findByAdmin(body.email,body.password).then((user)=>{
    console.log("sucess");
    console.log(user);
 return user.generateAuthToken().then((token)=>{
    res.send(token);
 });
}).catch((e)=>{
    res.send("error");
});

});




router.get('/catgory', authenticate, (req, res) => {
    Catogry.find({}, (err, cats) => {
        if (!err) {
            var catMap={value:'',label:''};
            var cat =[];
            for(let i=0;i<cats.length;i++){
                //console.log(cats[i]._id);
                catMap.value=cats[i]._id;
                catMap.label=cats[i].name;
                cat.push(catMap);
            }
            res.send(cat);
        }
        else{
            res.send("an error occured");
        }
    });
});

router.get('/books',authenticate, (req, res) => {
    Book.find({}, (err, books) => {
        if (!err) res.send(books);
        else{
            res.send("an error occured");
        }
    });
});
router.get('/authors', authenticate,(req, res) => {
    Author.find({}, (err, authors) => {
        if (!err) res.send(authors);
        else{
            res.send("an error occured");
        }
    });
});

router.post('/', authenticate,(req, res) => {
    const _email = req.body.email;
    const _password = req.body.password;
    Admin.find({ email: _email },(err,admin)=>{
        if(!err){
            if(admin.isAdmin == true && admin.password == _password){
                res.send(admin);
            }
            else{
                res.send("wrong data");
            }
        }
        else{
            res.send("admin not found check again ");
        }
    })
});

router.post('/book', authenticate, (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        //    return res.status(200).send(req.file)
        console.log(req.file);
        const name1 = req.body.name;
        const catId1 = req.body.catId;
        const authId1 = req.body.authId;
        const book = new Book({
            name: name1,
            catId: catId1,
            authId: authId1,
            image: req.file.filename,
            avgRate: 0,
        })
        book.save((err) => {
            if (!err) {

                res.send('book was saved');
            }
            else {
                res.send("an error occured");
            }
        })
    })
});

router.post('/catgory', authenticate,(req, res) => {
    const name1 = req.body.name;
    const catogry = new Catogry({
        name: name1,
    })
    catogry.save((err) => {
        if (!err) res.send('catgory was saved');
        else{
            res.send("an error occured");
        }
    })
});

router.post('/author', authenticate,(req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        //    return res.status(200).send(req.file)
        console.log(req.file);
        const fname1 = req.body.fname;
        const lname1 = req.body.lname;
        const email1 = req.body.email;
        const dataOfBirth1 = req.body.dataOfBirth;
        // const image1 = req.file.filename;
        const author = new Author({
            fname: fname1,
            lname: lname1,
            email: email1,
            dataOfBirth: dataOfBirth1,
            image: req.file.filename
        })
        author.save((err) => {
            if (!err) res.send('author was saved');
            else{
                res.send("an error occured");
            }
        })
        
    })
    
});
router.put('/book/:id', authenticate,(req, res) => {
    const name = req.body.name;
    const catId = req.body.catid;
    const authId = req.body.authid;
    const id = req.params.id;
    Book.updateOne({ _id: id }, { $set: { name: name, catId: catId, authId: authId  } }, (err) => {
        if (!err) res.send('Book updated!');
        else{
            res.send("an error occured");
        }
    });
});

router.put('/catgory/:id', authenticate,(req, res) => {
    const name = req.body.name;
    const id = req.params.id;
    Catogry.updateOne({ _id: id }, { $set: { name: name } }, (err) => {
        if (!err) res.send('catgory updated!');
        else{
            res.send("an error occured");
        }
    });
});

router.put('/author/:id', authenticate, (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const dataOfBirth = req.body.dataOfBirth;
    const id = req.params.id;
    Author.updateOne({ _id: id }, { $set: { fname: fname, lname: lname, dataOfBirth: dataOfBirth  } }, (err) => {
        if (!err) res.send('author updated!');
        else{
            res.send("an error occured");
        }
    });
});

router.delete('/book/:id',authenticate , (req, res) => {
    const id = req.params.id;
    Book.deleteOne({ _id: id }, (err) => {
        if (!err) res.send('Book Deleted');
        else{
            res.send("an error occured");
        }
    })
})

router.delete('/catgory/:id', authenticate,(req, res) => {
    const id = req.params.id;
    Catogry.deleteOne({ _id: id }, (err) => {
        if (!err) res.send('catgory Deleted');
        else{
            res.send("an error occured");
        }
    })
})

router.delete('/author/:id', authenticate,(req, res) => {
    const id = req.params.id;
    Author.deleteOne({ _id: id }, (err) => {
        if (!err) res.send('author Deleted');
        else{
            res.send("an error occured");
        }
    })
})


module.exports = router;
