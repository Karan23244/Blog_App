const express = require("express");
const {createPost, getAllPosts,getPostData, getEditPostData,deletePost,updatePost,getTopReadsAndEditorsChoice,getPostsByCategory } = require("../controller/postController");
const router = express.Router();
const multer = require('multer');
// Multer middleware for image upload
const upload = multer({
    dest: 'uploads/',  // Set the destination for file uploads
  });


router.post('/', upload.single('featuredImage'), createPost); 
router.get("/", getAllPosts);
router.get("/topReadsAndEditorsChoice", getTopReadsAndEditorsChoice);
router.get("/:id", getPostData);
router.get("/editData/:id",getEditPostData)
router.delete("/:id",deletePost)
router.put('/:id', upload.single('featuredImage'), updatePost);



module.exports = router;

