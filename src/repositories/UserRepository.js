const db = require("../config/database");
const User = require("../models/User");

class UserRepository {
  async create({ name, username, password }) {
    const query = `
      INSERT INTO users (name, username, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, username
    `;

    try {
      const result = await db.query(query, [name, username, password]);
      return User.fromDatabase(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const query = `
      SELECT id, name, username
      FROM users
      WHERE id = $1
    `;

    try {
      const result = await db.query(query, [id]);
      return result.rows[0] ? User.fromDatabase(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username) {
    const query = `
      SELECT id, name, username, password
      FROM users
      WHERE username = $1
    `;

    try {
      const result = await db.query(query, [username]);
      return result.rows[0] ? User.fromDatabase(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async update(id, { name, username, password }) {
    const query = `
      UPDATE users
      SET name = $1, username = $2, password = $3
      WHERE id = $4
      RETURNING id, name, username
    `;

    try {
      const result = await db.query(query, [name, username, password, id]);
      return result.rows[0] ? User.fromDatabase(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = `
      DELETE FROM users
      WHERE id = $1
      RETURNING id, name, username
    `;

    try {
      const result = await db.query(query, [id]);
      return result.rows[0] ? User.fromDatabase(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
