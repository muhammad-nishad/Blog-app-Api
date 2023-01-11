const {addPost} = require('../controllers/post')

const router=require('express').Router()

router.post('/',addPost)

// router.get('/getPost',getUserPost)

module.exports=router;