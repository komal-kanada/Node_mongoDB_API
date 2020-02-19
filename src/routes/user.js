import express from 'express';
import multer from 'multer';
import {login, search, find, data } from '../controller/user.controller'
const upload = multer({dest: __dirname + '/uploads/images'});

const router = express.Router();

// Using Ajax File Upload 
// const storage = multer.diskStorage({
//     destination : function(req, file, callback){
//         callback(null, '/uploadsajax')
//     },
//     filename: function(req, file, callback){
//         callback(null, file.fieldname + '-' + Date.now())
//     }
// });

// const uploadA = multer({ storage: storage}).single('userPhoto');

// router.get('/', function(req,res){
//     res.sendFile(__dirname + 'index.html');
// })

router.post('/api/photo', function(req,res){
    uploadA(req,res,function(err){
        if(err){
            return res.end('Erro Upload File');
        }
        res.end('File is Uploaded');
    })
})


router.post(
    '/signin',
    login
);
router.post(
    '/signup',
    search
);

router.get(
    '/list',
    find
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

module.exports = router;