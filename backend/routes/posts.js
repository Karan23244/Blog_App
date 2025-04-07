const express = require("express");
const {createPost, getAllPosts,getPostData, getEditPostData,deletePost,updatePost,getTopReadsAndEditorsChoice,relatedPosts } = require("../controller/postController");
const router = express.Router();
const multer = require('multer');
const path = require('path'); 
// Multer middleware for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save uploads in the "uploads" directory within the project
    cb(null, path.join(__dirname, "../uploads")); // Ensure correct path for uploads
  },
  filename: (req, file, cb) => {
    // Save file with a timestamp and original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
router.post('/', 
  upload.fields([
    { name: 'featuredImage', maxCount: 1 }, 
    { name: 'AdImage', maxCount: 1 }
  ]), 
  createPost
);

router.get("/", getAllPosts);
router.get("/topReadsAndEditorsChoice", getTopReadsAndEditorsChoice);
router.get("/:param2", getPostData);
router.get("/editData/:id", getEditPostData);
router.get("/related/:category", relatedPosts);
router.delete("/:id", deletePost);
router.put('/:id', 
  upload.fields([
    { name: 'featuredImage', maxCount: 1 }, 
    { name: 'AdImage', maxCount: 1 }
  ]), 
  updatePost
);



module.exports = router;