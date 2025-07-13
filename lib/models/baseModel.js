import fs from "fs/promises";

class BaseModel {
  constructor(data = [], filePath = "", fullDb = {}) {
    this.items = data;
    this.id = this.getLastId() + 1;
    this.filePath = filePath;
    this.fullDb = fullDb;
  }

  getLastId() {
    return this.items.reduce((max, item) => Math.max(max, item.id || 0), 0);
  }

  async saveToFile() {
    try {
      await fs.writeFile(
        this.filePath,
        JSON.stringify(this.fullDb, null, 2),
        "utf-8"
      );
    } catch (err) {
      console.error("Failed to write to file:", err.message);
    }
  }

  async getAll() {
    return this.items;
  }

  async getById(id) {
    return this.items.find((item) => item.id === Number(id));
  }

  async create(data) {
    const newItem = { id: this.id++, ...data };
    this.items.push(newItem);
    await this.saveToFile();
    return newItem;
  }

  async update(id, data) {
    const idx = this.items.findIndex((item) => item.id === Number(id));
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...data };
    await this.saveToFile();
    return this.items[idx];
  }

  async delete(id) {
    const idx = this.items.findIndex((item) => item.id === Number(id));
    if (idx === -1) return null;
    const deleted = this.items.splice(idx, 1);
    await this.saveToFile();
    return deleted[0];
  }
}

export default BaseModel;
