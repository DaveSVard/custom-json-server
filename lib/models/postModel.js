import BaseModel from "./baseModel.js";

class PostModel extends BaseModel {
  constructor(data, filePath, fullDb) {
    super(data, filePath, fullDb);
  }

  async addPost(post) {
    return this.create(post);
  }

  async getSinglePost(id) {
    return this.getById(id);
  }

  async deletePost(id) {
    return this.delete(id);
  }

  async updatePost(id, data) {
    return this.update(id, data);
  }
}

export default PostModel;
