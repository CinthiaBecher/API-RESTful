const db = require('../config/database');
const Task = require('../models/Task');

class TaskRepository {
  async findAll() {
    const query = `
      SELECT id, title, description, status
      FROM tasks
    `;
    
    try {
      const result = await db.query(query);
      return result.rows.map(row => Task.fromDatabase(row));
    } catch (error) {
      throw error;
    }
  }

  async create({ title, description, status }) {
    const query = `
      INSERT INTO tasks (title, description, status)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [title, description, status]);
      return Task.fromDatabase(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const query = `
      SELECT id, title, description, status
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

  async update(id, { title, description, status }) {
    const query = `
      UPDATE tasks
      SET title = $1, description = $2, status = $3
      WHERE id = $4
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [title, description, status, id]);
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