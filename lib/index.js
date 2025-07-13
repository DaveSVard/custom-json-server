import express from "express";
import bodyParser from "body-parser";

import PostModel from "./models/postModel.js";
import CommentModel from "./models/commentModel.js";

import PostController from "./controllers/postController.js";
import CommentController from "./controllers/commentController.js";

import createPostRoutes from "./routes/postRoutes.js";
import createCommentRoutes from "./routes/commentRoutes.js";

export function startServer(db, dbFilePath) {
  const postModel = new PostModel(db.posts || [], dbFilePath, db);
  const commentModel = new CommentModel(db.comments || [], dbFilePath, db);

  const postController = new PostController(postModel);
  const commentController = new CommentController(commentModel);

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/posts", createPostRoutes(postController));
  app.use("/comments", createCommentRoutes(commentController));

  const port = 8080;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
