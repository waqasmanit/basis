const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const User = require('../models/userModel')


let isUserVerified = false;
let email;
let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

//1.a enter email and send OTP API
exports.signup = async (req,res) => {
       
  email =req.body.email;
  
  

  // create reusable transporter object
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: `${process.env.SENDGRID_API_KEY}`,
  });

 try{
 //Verify SMTP connection configuration
 const verifyConnection = await transporter.verify();
 console.log("Server is ready to take our messages",verifyConnection);

 //sending email using sendgrid
const sendingMail = await transporter.sendMail({
  from: `"Admin@Developerr" ${process.env.SENDGRID_FROM}`,
  to: `${email}`,
  subject: "Please verify your email",
  text: 'OTP coming',
  html: "<h3>Welcome to Basis</h3>" + "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" 
});

      console.log('Message sent: %s', JSON.stringify(sendingMail,null,2));   
      res.status(200).json({
       message: 'OTP sent successfully '
    })
 }catch(err){
   console.log('Error occured while sending OTP', err);   
   res.status(400).json({
    message: 'OTP could not be sent'
   })
 }  
}

//1.b verify OTP 
exports.verify = (req,res)=> {
  const { clientOtp } = req.body;
  
  if(clientOtp == otp) {
    isUserVerified = true;
    res.send("OTP verification successful")
  } else res.send('Incorrect OTP');
}


//1.c enter first name+last name, check if email is verified and sign up
exports.signupUser = async (req,res)=> {
  const { firstName, lastName } = req.body;
  
  if(isUserVerified) {
    const newUser = await User.create({
      fname: firstName,
      lname: lastName,
      email,
    });
    res.status(200).json({
      message: 'Signup Successfull'
   })
  } else res.status(400).json({
    message: 'Email Not Verified'
 })
}


//2.b  if user is found in database, this should return user data
exports.loginUser = async (req,res)=> {
  const { loginOTP } = req.body;
  console.log('loginOTP',otp)
  if(loginOTP == otp) {
    let userData = await User.find({email},'fname lname email')
    console.log('logged in user data',userData)
    res.status(200).json({
      data: userData
   })
  } else res.status(400).json({
    message: 'User does not exist !!'
 })
}