class PostController {
  constructor(model) {
    this.postModel = model;
  }

  async addPost(req, res) {
    try {
      const newPost = await this.postModel.addPost(req.body);
      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json({ error: "Failed to add post" });
    }
  }

  async getPostById(req, res) {
    try {
      const postId = parseInt(req.params.id);
      const post = await this.postModel.getSinglePost(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: "Failed to get post" });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await this.postModel.getAll();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: "Failed to get posts" });
    }
  }

  async deletePost(req, res) {
    try {
      const postId = req.params.id;
      const result = await this.postModel.deletePost(postId);
      if (!result) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted", deleted: result });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  }

  async updatePost(req, res) {
    try {
      const updated = await this.postModel.updatePost(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to update post" });
    }
  }
}

export default PostController;
