import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPost,
  getAllPostsForHome,
  getUserPosts,
  // getUserPostById,
  // updatePostContent,
  // deletePost,
  // getPostById,
  // searchPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.route("/create-post").post(
  verifyJWT,
  upload.single("image"),
  createPost
);

router.route("/all-posts").get(verifyJWT, getAllPostsForHome);
router.route("/user-posts/:username").get(verifyJWT, getUserPosts);
// router.route("/:postId").get(verifyJWT, getPostById);
// router.route("/search/post").get(verifyJWT, searchPosts);
// router.route("/user/:postId").get(verifyJWT, getUserPostById);
// router
//   .route("/update-post-content/:postId")
//   .patch(verifyJWT, updatePostContent);
// router.route("/delete-post/:postId").delete(verifyJWT, deletePost);

export default router;
