const mongoose=require('mongoose');
const { Schema } = mongoose;

const AlumSchema = new Schema({
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
 ph_no:{
    type:Number,
    default:0,
 },
 work:{
   type:String,
   default:""
 },
 founders:{
   type:String,
   default:""
 },
 year_founded_in:{
   type:Number,
   default:null
 }

});

module.exports=mongoose.model('Alum', AlumSchema);