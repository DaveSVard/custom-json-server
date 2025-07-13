import express from "express";

export default function createPostRoutes(postController) {
  const router = express.Router();

  router.get("/", (req, res) => postController.getAllPosts(req, res));
  router.get("/:id", (req, res) => postController.getPostById(req, res));
  router.post("/", (req, res) => postController.addPost(req, res));
  router.put("/:id", (req, res) => postController.updatePost(req, res));
  router.delete("/:id", (req, res) => postController.deletePost(req, res));

  return router;
}
