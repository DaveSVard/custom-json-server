class CommentController {
  constructor(model) {
    this.commentModel = model;
  }

  async addComment(req, res) {
    try {
      const newComment = await this.commentModel.addComment(req.body);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json({ error: "Failed to add comment" });
    }
  }

  async getCommentById(req, res) {
    try {
      const commentId = parseInt(req.params.id);
      const comment = await this.commentModel.getSingleComment(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json({ error: "Failed to get comment" });
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await this.commentModel.getAll();
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ error: "Failed to get comments" });
    }
  }

  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;
      const result = await this.commentModel.deleteComment(commentId);
      if (!result) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted", deleted: result });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete comment" });
    }
  }

  async updateComment(req, res) {
    try {
      const updated = await this.commentModel.updateComment(
        req.params.id,
        req.body
      );
      if (!updated) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to update comment" });
    }
  }
}

export default CommentController;
