import express from 'express';
import { client } from '../mongodb.mjs';
import jwt from 'jsonwebtoken';
import {
    stringToHash,
    varifyHash,
    validateHash
} from 'bcrypt-inzi'



const db = client.db('attendance');
const studentsCollection = db.collection('students');

let router = express.Router()



router.post('/login', async (req, res, next) => {
    console.log("Log in to this page");
    if (
        !req.body.email
        || !req.body.password
    ) {
        res.status(403);
        res.send(`required parameters missing, 
        example request body:
        {
            email: "some@email.com",
            password: "some$password",
        } `);
        return;
    }

    req.body.email = req.body.email.toLowerCase()
    try {
        const result = await studentsCollection.findOne({ email: req.body.email });

        if (!result) {
            res.status(403).send({ message: "email incorect" })
        } else {
            const isMatch = varifyHash(req.body.password, result.password)

            if (isMatch) {

                const token = jwt.sign({
                    isAdmin: false,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: req.body.email,
                    _id: result._id
                }, process.env.SECRET, {
                    expiresIn: '24h'
                })

                const expiresCookie = new Date();
                expiresCookie.setHours(expiresCookie.getHours() + 1)
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 86400000)
                })

                res.send({
                    message: "Login Successful",
                    data: {
                        isAdmin: result.isAdmin,
                        name: result.name,
                        email: req.body.email,
                        profilePic: result.profilePic,
                        _id: result._id
                    }
                });
                return;
            } else {
                res.status(401).send({
                    message: "password incorrect"
                })
            }
        }
    } catch (error) {

        console.log("error getting data", error)
        res.status(500).send("server error, please try later")
    }

})

router.post('/logout', async (req, res, next) => {
    res.clearCookie('token');
    res.send({ message: "Logout Successful" });
})


export default router