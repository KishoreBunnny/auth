const { urlencoded } = require('body-parser');
const express = require('express');
const mongoose = require("mongoose")
const cors=require('cors')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();


const User = require('./models/user.model')

mongoose.connect(process.env.MONOGO_DB_URI)
    .then(() => console.log('Mongo Connected'))
    .catch((error) => console.error("MongoDB connection error:", error));



const app = express();


app.use(cors({
  origin: ['http://localhost:5173', '*']
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




app.get('/', (req, res) => {
    res.send("hello auth")
})


app.post('/api/signup', async (req, res) => {

    const data = req.body

    if (!data) return res.status(400).send("invaild data,please enter valid data")

    const { username, email, password } = data


    if (username?.trim().length < 4) return res.status(400).send("username must be atleast 4 letters")
    if (password?.trim().length < 4) return res.status(400).send("password must be atleast 4 letters")

    let newUsername,newEmail

    
        if (username) {
            const existingUsername = await User.findOne({ username })
            if (existingUsername) {
                return res.status(409).json({
                    message: "username already exists",
                    error: "uniquekeyerror"
                });
            }
            else newUsername=username
        }
        else if(!username || username.trim().length<0 || username==="undefined" ){
            newUsername=`_blank-field-${Math.floor(Math.random() * 10000000)}`
        }

        if (email) {
            const existingEmail = await User.findOne({ email })
            if (existingEmail) {
              return  res.status(409).json({
                    message: "email already exists",
                    error: "uniquekeyerror"
                });
            }
            else newEmail=email
        }
        else if(!email || email.trim().length<0 || email==="undedined" ){
            newEmail=`_blank-field-${Math.floor(Math.random() * 1000000)}`
        }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const token = jwt.sign({ username, email }, "kishore@2005", {
            expiresIn: "1d"
        })
        const response = await User.create({ username:newUsername, email:newEmail, password: hashedPassword })
        if (response) return res.status(201).send({ username, email, auth:token,message:"user registered successfully" })
        res.status(400).send("error while creating user")

    } catch (error) {
        res.status(409).json({
            message: "user already exists",
            error: "uniquekeyerror"
        });
    }



  




})



app.post('/api/signin', (req, res) => {
    res.status(200).send("login")
})


app.listen(8000, () => console.log("server is running in 8000"))