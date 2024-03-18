const mongoose=require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
 name:{
    type:String,
    required:true,
 },
 mail:{
    type:String,
    required:true,
 },
 password:{
    type:String,
    required:true,
 },
 date:{
    type:Date,
    default:Date.now,
 },
 skills:{
   type:String,
   default:""
 },
 branch:{
   type:String,
   default:""
 },
 GPA:{
   type:mongoose.Types.Decimal128,
   default:0.00
 }

});

module.exports=mongoose.model('Student', StudentSchema);