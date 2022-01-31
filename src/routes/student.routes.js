const express = require('express')

const router = express.Router()


const studentController = require('../controllers/student.controllers');

const multer=require('multer')

const checkAuth=require('../middleware/check-auth')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null , file.originalname);
    }
});

const upload=multer({storage:storage})

// Retrieve all users
router.get('/',studentController.findAll);

// Reterive One user
router.get('/:id', studentController.getStudent)

router.put('/:id',checkAuth, upload.single('productImage'),studentController.update);

// Create a new user
router.post('/',  upload.single('productImage'),studentController.create);

// Delete User
router.delete('/:id', checkAuth, studentController.delete);

module.exports = router
