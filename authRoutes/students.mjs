import express from 'express';
import { client } from '../mongodb.mjs';


const router = express.Router();

const db = client.db('attendance');
const studentsCollection = db.collection('students');


router.get('/register', (req, res) => {

    console.log(req.body);

});

export default router;