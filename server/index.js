const { urlencoded } = require('body-parser');
const express = require('express');
const mongoose = require("mongoose")
const cors = require('cors')

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

//npm i express-rate-limit
//const rateLimit=requrie('express-rate-limit')
// const apilimiter=rateLimit({
//     windowMs:60_000,//1min,
//     max:3,
// });

//ex
// app.get('/limit',(_,res)=>{
//     res.send("rate limit example for 3 req only")
// })

app.get('/', (req, res) => {
    res.send("hello auth")
})


app.post('/api/signup', async (req, res) => {

    const data = req.body

    if (!data) return res.status(400).send("invaild data,please enter valid data")

    const { username, email, password } = data

    // if (!AUTH_SECRET) return res.status(400).send("AUTH_SECRET is requried,please give AUTH_SECRET")

    if (username) {
        if (username?.trim().length < 4) return res.status(400).send("username must be atleast 4 letters")
    }
    if (password) {
        if (password?.trim().length < 4) return res.status(400).send("password must be atleast 4 letters")
    }

    let newUsername, newEmail

    if (username) {
        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            return res.status(409).json({
                message: "username already exists",
                error: "uniquekeyerror"
            });
        }
        else newUsername = username
    }
    else if (!username || username.trim().length < 0 || username === "undefined") {
        newUsername = `_blank-field-${Math.floor(Math.random() * 10000000)}-${Date.now()}`;
    }

    if (email) {
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(409).json({
                message: "email already exists",
                error: "uniquekeyerror"
            });
        }
        else newEmail = email
    }
    else if (!email || email.trim().length < 0 || email === "undedined") {
        newEmail = `_blank-field-${Math.floor(Math.random() * 1000000)}-${Date.now()}`;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const response = await User.create({ username: newUsername, email: newEmail, password: hashedPassword })
        if (response) return res.status(201).send({ username, email, message: "user registered successfully" })
        res.status(400).send("error while creating user")

    } catch (error) {
        res.status(409).json({
            message: "user already exists",
            error: "uniquekeyerror"
        });
    }
})



app.post('/api/signin', async (req, res) => {
    const data = req.body;
    if (!data) return res.status(400).send("invaild data,please enter valid data")

    const { username, email, password } = data

    if (!password || (!username && !email)) {
        return res.status(400).send("invaild data,please enter valid data");
    }
    console.log(data)
    console.log(username)
    console.log(email)

    try {
        if (username && username !== "undefined") {
            console.log("in username")
            const existingUsername = await User.findOne({ username })
            if (!existingUsername || existingUsername === "undefined") return res.status(404).send("invalid user credentials")

            const hash = existingUsername.password
            bcrypt.compare(password, hash, (error, result) => {
                if (error) return res.status(404).send("invalid user credentials")
                if (result) {
                    const token = jwt.sign({ username }, "kishore@2005", {
                        expiresIn: "1d"
                    })
                    res.cookie('authUsername', token, {
                        maxAge: 1000 * 60 * 60 * 24,
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        path: "/",
                    })
                    res.status(200).send({ message: "logged in success with username", auth: token })
                }
                if (!result) return res.status(404).send("invalid user credentials")
            })
        }


        if (email && email !== "undefined") {
            console.log("in email")
            const existingEmail = await User.findOne({ email })
            if (!existingEmail || existingEmail === "undefined") return res.status(404).send("invalid user credentials")

            console.log(existingEmail)
            const hash = existingEmail.password
            bcrypt.compare(password, hash, (error, result) => {
                if (error) return res.status(404).send("invalid user credentials")
                if (result) {
                    const token = jwt.sign({ email }, "kishore@2005", {
                        expiresIn: "1d"
                    })
                    res.cookie('auth', token, {
                        maxAge: 1000 * 60 * 60 * 24,
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        path: "/",
                    })
                    res.status(200).send({ message: "logged in success with email", auth: token, })
                }
                if (!result) return res.status(404).send("invalid user credentials")
            })
        }

    } catch (error) {
        return res.status(500).send("Something went wrong");
    }


})


app.listen(8000, () => console.log("server is running in 8000"))
