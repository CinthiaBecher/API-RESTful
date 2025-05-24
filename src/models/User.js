const db = require('../config/database');

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
      password: row.password
    });
  }

  // Listar todos os usuários
  static async findAll() {
    const query = `
      SELECT id, name, username
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
  static async create({ name, username, password }) {
    const query = `
      INSERT INTO users (name, username, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, username
    `;
    
    try {
      const result = await db.query(query, [name, username, password]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por ID
  static async findById(id) {
    const query = `
      SELECT id, name, username
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

  // Buscar usuário por username
  static async findByUsername(username) {
    const query = `
      SELECT id, name, username, password
      FROM users
      WHERE username = $1
    `;
   
    try {
      const result = await db.query(query, [username]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Atualizar usuário
  static async update(id, { name, username, password }) {
    const query = `
      UPDATE users
      SET name = $1, username = $2, password = $3
      WHERE id = $4
      RETURNING id, name, username
    `;
    
    try {
      const result = await db.query(query, [name, username, password, id]);
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
      RETURNING id, name, username
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