import BaseModel from "./baseModel.js";

class CommentModel extends BaseModel {
  constructor(data, filePath, fullDb) {
    super(data, filePath, fullDb);
  }

  async addComment(comment) {
    return this.create(comment);
  }

  async getSingleComment(id) {
    return this.getById(id);
  }

  async deleteComment(id) {
    return this.delete(id);
  }

  async updateComment(id, data) {
    return this.update(id, data);
  }
}

export default CommentModel;
