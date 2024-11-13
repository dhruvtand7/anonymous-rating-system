const db = require('../config/db.config');

class User {
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(userData) {
    const { name, email, password, role } = userData;
    const [result] = await db.query(
      'INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM User WHERE user_id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;