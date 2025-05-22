const db = require('../config/database');
const User = require('../models/User');

class UserRepository {
  async findAll() {
    const query = `
      SELECT id, name
      FROM users
    `;
    
    try {
      const result = await db.query(query);
      return result.rows.map(row => User.fromDatabase(row));
    } catch (error) {
      throw error;
    }
  }

  async create({ name }) {
    const query = `
      INSERT INTO users (name)
      VALUES ($1)
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [name]);
      return User.fromDatabase(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const query = `
      SELECT id, name
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

  async update(id, { name }) {
    const query = `
      UPDATE users
      SET name = $1
      WHERE id = $2
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [name, id]);
      return result.rows[0] ? User.fromDatabase(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
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