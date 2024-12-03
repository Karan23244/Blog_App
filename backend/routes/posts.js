const express = require("express");
const {createPost, getAllPosts,getPostData, getEditPostData,deletePost,updatePost,getTopReadsAndEditorsChoice,getPostsByCategory } = require("../controller/postController");
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
router.post('/', upload.single('featuredImage'), createPost); 
router.get("/", getAllPosts);
router.get("/topReadsAndEditorsChoice", getTopReadsAndEditorsChoice);
router.get("/:id_or_slug", getPostData);
router.get("/editData/:id",getEditPostData)
router.delete("/:id",deletePost)
router.put('/:id', upload.single('featuredImage'), updatePost);



module.exports = router;