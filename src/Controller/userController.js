//importing module to use in this file we everything in node js modules they are state in 
//provate mood in evry file so if we have need to use in other file we have to import file by using require


const userModel=require("../Model/userModel")
const aws=require("../Controller/awsController")

const jwt=require("jsonwebtoken")


//isValid is create for validation that if user provide epty string it through error towards the user
const isValid=function (value){
    if(typeof value ==="undefined"||typeof value ===null) return false
    if(typeof value ==='string' &&  value.trim().length ===0) return false
    return true
}

//here using validation for uploading file or logo or image
const isValidfiles = function (files) {
    if (files && files.length > 0)
        return true
}


const userDetails=async function(req,res){
    try{
        let data =req.body
        let files=req.files

        let {name,email,password,address,country}=data

        if(Object.keys(data).length==0){
            return res.status(400).send({status:false,msg:"empty"})
        }
        if(!isValid(name)){
            return res.status(400).send({status:false,msg:"please fill the name"})
        }
        if(!isValid(email)){
            return res.status(400).send({status:false,msg:"please fill the email adress"})

        }

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, msg: "Invalid email" })
            
        }
        if(!isValid(password)){
            return res.status(400).send({status:false,msg:"password is rquired"})
      }
      if (password.length > 8) {
        return  res.status(400).send({ status: false, msg: "Password should be less than 15 characters"})
          
      }
      if (password.length < 5) {
        return  res.status(400).send({ status: false, msg: "Password should be more than 8 characters"})
          
      }
     if(!isValid(address)){
         return res.status(400).send({status:false,msg:"address is required"})
     }

     if(!isValid(country)){
        return res.status(400).send({status:false,msg:"please fill the country"})
     }

     let emailAlreadyPresent=await userModel.findOne({email})
     if(emailAlreadyPresent){
        return res.status(406).send({status:false,msg:"email is alraedy taken"})
     }

     if(!isValidfiles(files)){
        return res.status(400).send({status:false,msg:"please put your avatar"})
     }

     avatar=await aws.uploadFile(files[0])
     
       
     const userData={
        name,email,password,address,country,avatar
     }
      const userdatacreated=await userModel.create(userData)
      return res.status(201).send({status:true,msg:"data sucessfully created",data:userdatacreated})
    }catch(error){
    res.status(500).send({status:false,msg:error.message})

}
}



const loginUser=async function(req,res){
    try {
        let body=req.body
        let {email,password}=body
        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: "Email is required" })
            return
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, msg: "email should have valid email address" })
            return
        }
        
        if (!isValid(password)) {
            res.status(400).send({ status: false, msg: "Password is required" })
            return
        }

        let userDetails=await userModel.findOne({email:email,password:password})
        if(!userDetails){
            return res.status(400).send({status:false,msg:"please provide right credentials"})
        }
        else{
            let token=jwt.sign({userId:userDetails._id,

            },"value_Pitch",{expiresIn:"60m"})
            res.header("x-api-key",token)
            res.status(201).send({status:true,msg:"user login sucessfull",data:token})

        }
    } catch (error) {
        console.log(error)
        
        res.status(500).send({msg:error.message})
        
    }
}


const getUserDetailsById=async function(req,res){
    try{
        const userId=req.params.userId

        if(req.userId!==userId){
            return res.status(401).send({status:false,msg:"you are not authorized"})

        }

        const profile=await userModel.findOne({_id:userId})

        if(!profile){
            return res.status(400).send({status:false,msg:"profile does not found"})
        }
        return res.status(200).send({status:false,msg:"profile detatils",data:profile})


    }catch(error){
        res.status(500).send({msg:error.message})
    }
}






module.exports.userDetails=userDetails

module.exports.loginUser=loginUser

module.exports.getUserDetailsById=getUserDetailsById
