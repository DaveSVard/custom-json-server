import express from "express";

export default function createCommentRoutes(commentController) {
  const router = express.Router();

  router.get("/", (req, res) => commentController.getAllComments(req, res));
  router.get("/:id", (req, res) => commentController.getCommentById(req, res));
  router.post("/", (req, res) => commentController.addComment(req, res));
  router.put("/:id", (req, res) => commentController.updateComment(req, res));
  router.delete("/:id", (req, res) =>
    commentController.deleteComment(req, res)
  );

  return router;
}
