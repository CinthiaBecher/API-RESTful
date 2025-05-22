const db = require('../config/database');
const Task = require('../models/Task');

class TaskRepository {
  async findAll() {
    const query = `
      SELECT id, title, description, status, user_id
      FROM tasks
    `;
    
    try {
      const result = await db.query(query);
      return result.rows.map(row => Task.fromDatabase(row));
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(userId) {
    const query = `
      SELECT id, title, description, status, user_id
      FROM tasks
      WHERE user_id = $1
    `;
    
    try {
      const result = await db.query(query, [userId]);
      return result.rows.map(row => Task.fromDatabase(row));
    } catch (error) {
      throw error;
    }
  }

  async create({ title, description, status, user_id }) {
    const query = `
      INSERT INTO tasks (title, description, status, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [title, description, status, user_id]);
      return Task.fromDatabase(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const query = `
      SELECT id, title, description, status, user_id
      FROM tasks
      WHERE id = $1
    `;
    
    try {
      const result = await db.query(query, [id]);
      return result.rows[0] ? Task.fromDatabase(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async update(id, { title, description, status, user_id }) {
    const query = `
      UPDATE tasks
      SET title = $1, description = $2, status = $3, user_id = $4
      WHERE id = $5
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [title, description, status, user_id, id]);
      return result.rows[0] ? Task.fromDatabase(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [id]);
      return result.rows[0] ? Task.fromDatabase(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskRepository; 