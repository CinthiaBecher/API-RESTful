const db = require("../config/database");

class User {
  constructor({ id, name, username, password }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
  }

  isValid() {
    return this.name && this.username && this.password;
  }

  static fromDatabase(row) {
    return new User({
      id: row.id,
      name: row.name,
      username: row.username,
      password: row.password,
    });
  }
}

module.exports = User;
