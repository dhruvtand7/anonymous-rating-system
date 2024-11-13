const db = require('../config/db.config');

class Section {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Section');
    return rows;
  }

  static async create(sectionName) {
    const [result] = await db.query(
      'INSERT INTO Section (section_name) VALUES (?)',
      [sectionName]
    );
    return result.insertId;
  }
}

module.exports = Section;