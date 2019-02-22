require('./mongoConfig');

const express = require('express');
const app = express();
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');


app.use(express.json());

app.use('/admin' ,adminRouter);
//app.use('/user', userRouter);

app.listen(4000, () => {
    console.log("started");
})