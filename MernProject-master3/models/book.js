const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  image:String,
  avgRate:Number,
  authId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author',}],
  catId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Catgory'}]

});

bookSchema.statics.totalRate = function(bookId1){
  var totalRate=0;
  return new Promise ((resolve,reject) =>{
    UserBook.find({bookId: bookId1},(err,data)=>{
   console.log(data);
    if(data){
    data.forEach(element => {
     // console.log(element.rate);
     if(element.rate)
      totalRate=totalRate+element.rate;
    });
   console.log(totalRate);
    resolve(totalRate);
  }
  else{
    reject();
  }
    
  })});
 // return totalRate;
}

bookSchema.statics.calcAvgRate=function (bookId){
  var ausers=0;
  var totalRate1=0;
  var avg=0;
  return new Promise((resolve,reject)=>{
    User.getAllUsers().then((users)=>{
      
      ausers+=users;
    });
    Book.totalRate(bookId).then((totalRate)=>{
       
       totalRate1+=totalRate;
       avg=totalRate1/ausers;
       resolve(avg);
       console.log(avg);
       console.log(totalRate1);
    });
  })

}



const Book = mongoose.model('Book', bookSchema);

module.exports = Book;