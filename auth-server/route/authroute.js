const express=require('express')

const mongoose=require('mongoose')

const jwt=require('jsonwebtoken')

const {jwtkey} =require('../keys')

const router=express.Router()

const User=mongoose.model('User')

router.post('/signup',async(req,res)=>{
	
	//console.log(req.body)
	

	
	const {name,email,password} = req.body
	
		try{
			const user=new User({name,email,password})
	
	         await  user.save()
			 
			 const token=jwt.sign({userId:user._id},jwtkey)
		   
		      res.send({token})
			
		}
		catch(err){
			
			res.status(422).send(err.message)
			
		}
	
	
	
	
	
})

router.post('/signin',async(req,res)=>{
	
	const {name,email,password} = req.body
	
	if(!email|| !password)
	{
		
		return res.status(422).send({error:"Please provide the required field"})
	}
	
	const user =await User.findOne({email})
	
	if(!user)
	{
		
		return res.status(422).send({error:"Please provide the required field"})
		
	}
	try{
		
		await user.comparePassword(password)
		
		const token=jwt.sign({userId:user._id},jwtkey)
		   
		      res.send({token})
	}
	catch(err)
	{
		
		return res.status(422).send({error:"Please provide the required field"})
		
		
	}
	
})




module.exports=router