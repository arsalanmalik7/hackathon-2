import express from 'express';
import { client } from '../mongodb.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();
const db = client.db('attendance');
const studentsCollection = db.collection('students');



router.get(`/profile`, async (req, res) => {
    console.log('profile hit')
    const userId = req.params.userId || req.body.decoded._id;

    if (!ObjectId.isValid(userId)) {
        res.status(403).send(`Invalid user id`);
        return;
    }


    try {

        const result = await studentsCollection.findOne({ _id: new ObjectId(userId) });
        console.log("profileResult: ", result);

        res.send({
            message: "profile fetched",
            data: {
                email: result.email,
                name: result.name,
                isAdmin: result.isAdmin,
                _id: result._id,
                profilePic: result.profilePic,
            }
        })
    } catch (error) {

        console.log("error getting data mongodb: ", error);
        res.status(500).send('server error, please try later');
    }

})


router.get('/profile/:studentId:', (req, res) => {

});

export default router;