const mongoose=require('mongoose');
const MongoURI="mongodb+srv://prabhavrajputug21:Prabhav7c@cluster0.hmvylk9.mongodb.net/Alumni";

const connectToMongo=()=>{
    mongoose.connect(MongoURI)
    
}


module.exports=connectToMongo