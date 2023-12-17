import express from 'express';

const router = express.Router();


router.post(`/api/registor`, (req, res, next)=>{
    res.send('registor');

})