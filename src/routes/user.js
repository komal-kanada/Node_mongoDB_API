import express from 'express';
import multer from 'multer';
const upload = multer({dest: __dirname + '/uploads/images'});
import {login, search, find, data } from '../controller/user.controller'


const router = express.Router();

router.post(
    '/signin',
    login
);
router.post(
    '/signup',
    search
);

router.post('/upload', upload.single('photo'), (req, res) => {
    try{
        if(req.file) {
            res.json(req.file);
            res.status(200).send(response)
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message
        })
    }
});

router.post('/uploadmultiple', upload.array('photo',12), async (req,res) => {
    try{
        if(req.files && req.files.length) {
            res.send(req.files)
        }
    }catch(error){
        res.status(500).send({
            message: error.message
        })
    }
})

router.get(
    '/list',
    find
);

module.exports = router;