require('./mongoConfig');

const express = require('express');
const app = express();
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const bookRouter =require('./routes/bookRouter');
const authorRouter = require('./routes/authorRouter');
const catgoryRouter = require('./routes/catgoryRouter');
const authenticate=require('./middleWare/authenticate');

app.use(express.json());


app.use('/admin' ,adminRouter);
app.use('/', userRouter);
app.use('/book' ,bookRouter);
app.use('/catgory' ,catgoryRouter);
app.use('/author' ,authorRouter);

app.listen(4000, () => {
    console.log("started");
})