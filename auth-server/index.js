const express = require('express')

const bodyParser = require('body-parser')

const mongoose=require('mongoose')


const port=3000

const app=express()

const {mongourl}=require('./keys.js')


require('./model/User')

const requireToken=require('./middlewares/requireToken')

const authroute=require('./route/authroute')


app.use(bodyParser.json())

app.use(authroute)


mongoose.connect(mongourl,{
	
	useNewUrlParser:true,
	useUnifiedTopology:true
	
})

mongoose.connection.on('connected',()=>{
	
	console.log("connected to mongo")
	
})


mongoose.connection.on('error',(err)=>{
	
	console.log("not connected to mongo",err)
	
})



app.get('/',requireToken,(req,res)=>{
	
	//res.send("Welcome To Your Profile : "+req.user.name)
	res.send(`Hi ${req.user.name} Welcome To Your Profile`)
})


app.listen(port,()=>{
	
	console.log(`server running at ${port}`)
	
})