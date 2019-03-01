require('./mongoConfig');

const express = require('express');
const app = express();
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const bookRouter =require('./routes/bookRouter');
const authorRouter = require('./routes/authorRouter');
const catgoryRouter = require('./routes/catgoryRouter');
const userBookRouter = require('./routes/userBookRouter');
const authenticate=require('./middleWare/authenticate');
app.use(express.json());
const cors = require('cors');
var bodyParser = require('body-parser');

app.use('/public' ,express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/admin' ,adminRouter);
app.use('/', userRouter);
app.use('/book' ,bookRouter);
app.use('/catgory' ,catgoryRouter);
app.use('/author' ,authorRouter);
app.use('/userBook',userBookRouter);

app.listen(5005, () => {
    console.log("started");
})