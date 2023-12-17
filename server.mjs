import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

import LoginRouter from './unAuthRoute/unAuth.mjs';
import studentsRouter from './authRoutes/students.mjs';
import profileRouter from './authRoutes/profile.mjs';



const app = express();

const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
        origin: [
            'http://localhost:3000',
            'http://192.168.0.109:3000',
            '*'
        ],
        credentials: true,
        methods: "GET,POST,PUT,DELETE",
    }
));


app.use(`/api`, LoginRouter);

app.use(`/api`, (req, res, next) => {



    try {
        const token = req.cookies.token;

        const decoded = jwt.verify(token, process.env.SECRET)
        console.log("decoded: ", decoded);

        req.body.decoded = {
            _id: decoded._id,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            profilePic: decoded.profilePic,
            isAdmin: decoded.isAdmin,
        };
        req.currentUser = {
            _id: decoded._id,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            profilePic: decoded.profilePic,
            isAdmin: decoded.isAdmin,
        };
        next();

    } catch (error) {
        res.status(401).send({ message: " token is invalid " })
        console.log("token is invalid");
        return;

    }
});


app.use(`/api`, studentsRouter);
app.use(`/api`, profileRouter);



app.use(`/`, express.static(path.join(__dirname, '/frontend/build')))
app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Attendence app listening on ${PORT} `)
});