const db = require("../config/database");

class Task {
  constructor({ id, title, description, status, user_id }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.user_id = user_id;
  }

  isValid() {
    return this.title && this.title.length > 0;
  }

  static fromDatabase(row) {
    return new Task({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      user_id: row.user_id,
    });
  }
}

module.exports = Task;
