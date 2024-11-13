const db = require('../config/db.config');

class Feedback {
  static async create(feedbackData) {
    const { senderId, recipientId, content, type } = feedbackData;
    const table = type === 'teacher' ? 'TeacherFeedback' : 'StudentFeedback';
    
    const [result] = await db.query(
      `INSERT INTO ${table} (${type === 'teacher' ? 'student_id' : 'teacher_id'}, 
       ${type === 'teacher' ? 'teacher_id' : 'student_id'}, feedback_content) 
       VALUES (?, ?, ?)`,
      [senderId, recipientId, content]
    );
    return result.insertId;
  }

  static async getForUser(userId, role) {
    let query;
    if (role === 'Student') {
      query = `
        SELECT f.*, u.name as teacher_name 
        FROM StudentFeedback f
        JOIN User u ON u.user_id = f.teacher_id
        WHERE f.student_id = ?
      `;
    } else if (role === 'Teacher') {
      query = `
        SELECT f.*, u.name as student_name 
        FROM TeacherFeedback f
        JOIN User u ON u.user_id = f.student_id
        WHERE f.teacher_id = ?
      `;
    }
    
    const [rows] = await db.query(query, [userId]);
    return rows;
  }
}

module.exports = Feedback;