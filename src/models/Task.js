const db = require('../config/database');

class Task {
  // Listar todas as tarefas
  static async findAll() {
    const query = `
      SELECT id, title, description, status
      FROM tasks
    `;
    
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Criar uma nova tarefa
  static async create({ title, description, status }) {
    const query = `
      INSERT INTO tasks (title, description, status)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [title, description, status]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Buscar tarefa por ID
  static async findById(id) {
    const query = `
      SELECT id, title, description, status
      FROM tasks
      WHERE id = $1
    `;
    
    try {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Atualizar tarefa
  static async update(id, { title, description, status }) {
    const query = `
      UPDATE tasks
      SET title = $1, description = $2, status = $3
      WHERE id = $4
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [title, description, status, id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Deletar tarefa
  static async delete(id) {
    const query = `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Task; 