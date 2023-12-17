import express from 'express';
import { client } from '../mongodb.mjs';
import { stringToHash } from 'bcrypt-inzi'


const router = express.Router();

const db = client.db('attendance');
const studentsCollection = db.collection('students');


router.post('/register', async (req, res) => {
    console.log('req.body: ', req.body);

    if (
        !req.body.name
        || !req.body.email
        || !req.body.password
        || !req.body.course

    ) {
        res.status(403);
        res.send(`required parameters missing, 
        example request body:
        {
            firstName: "name",
            email: "some@email.com",
            password: "some$password"
        } `);
        return;
    }


    try {
        const result = await studentsCollection.findOne({ email: req.body.email.toLowerCase() });
        console.log("result ", result)

        const hashPassword = await stringToHash(req.body.password);

        if (!result) {
            const insertedUser = await studentsCollection.insertOne({
                isAdmin: false,
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                passwordHash: hashPassword,
                password: req.body.password,
                course: req.body.course,
                profilePic: req.body.profilePic || null,
                createdOn: new Date()
            })
            console.log("insertedUser ", insertedUser);
            res.status(200).send({ message: "Signup Successfully!" });
        } else {
            res.status(403).send({ message: "user already exist" })
        }
    } catch (error) {
        console.log("error getting data mongodb: ", error);
        res.status(500).send('server error, please try later');

    }


});


router.get('/allStudents', async (req, res) => {
    try {
        const result = await studentsCollection.find().skip(1).toArray();
        res.status(200).send(result);
    } catch (error) {
        console.log("error getting data mongodb: ", error);
        res.status(500).send('server error, please try later');

    }
})

export default router;