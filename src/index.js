const express=require("express")

const bodyParser=require("body-parser")

const route=require("./route/routes")

const mongoose=require("mongoose")

//multer node js middleware to handel multipartdata for uploading files.
const multer=require("multer")

const app=express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.use(multer().any())


mongoose.connect("mongodb://localhost:27017",{
    useUnifiedTopology:true
}).then(()=>console.log("mongoDb connected"))
.catch(err=>console.log(err))

app.use("/",route)

app.listen(4000,function(){
    console.log("server is running on"+" "+4000)
})

