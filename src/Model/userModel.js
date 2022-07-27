const mongoose=require("mongoose")

const UserdeatilsSchema=new mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 8
    },

    avatar:{
        type:String,
        required:true
    },

      address:{
         type:String,
         required:true
      },
      country:{
         type:String,
         required:true
      }
    
},{timestamps:true})
module.exports=mongoose.model("User",UserdeatilsSchema)