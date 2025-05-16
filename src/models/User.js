const db = require('../config/database');

class User {
  // Listar todos os usuários
  static async findAll() {
    const query = `
      SELECT id, name
      FROM users
    `;
    
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Criar um novo usuário
  static async create({ name }) {
    const query = `
      INSERT INTO users (name)
      VALUES ($1)
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [name]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por ID
  static async findById(id) {
    const query = `
      SELECT id, name
      FROM users
      WHERE id = $1
    `;
    
    try {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Atualizar usuário
  static async update(id, { name }) {
    const query = `
      UPDATE users
      SET name = $1
      WHERE id = $2
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [name, id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Deletar usuário
  static async delete(id) {
    const query = `
      DELETE FROM users
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

module.exports = User; 