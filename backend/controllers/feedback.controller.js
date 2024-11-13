const db = require('../config/db.config');

exports.submitFeedback = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.user.id;
    const senderRole = req.user.role;

    let table = '';
    if (senderRole === 'Student') {
      table = 'TeacherFeedback';
    } else if (senderRole === 'Teacher') {
      table = 'StudentFeedback';
    }

    await db.query(
      `INSERT INTO ${table} (sender_id, recipient_id, feedback_content) VALUES (?, ?, ?)`,
      [senderId, recipientId, content]
    );

    res.json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let query = '';
    if (userRole === 'Student') {
      query = 'SELECT * FROM StudentFeedback WHERE recipient_id = ?';
    } else if (userRole === 'Teacher') {
      query = 'SELECT * FROM TeacherFeedback WHERE recipient_id = ?';
    } else if (userRole === 'Admin') {
      query = `
        SELECT * FROM TeacherFeedback
        UNION
        SELECT * FROM StudentFeedback
      `;
    }

    const [feedback] = await db.query(query, userRole === 'Admin' ? [] : [userId]);
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllFeedback = async (req, res) => {
    try {
      const [teacherFeedback] = await db.query('SELECT * FROM TeacherFeedback');
      const [studentFeedback] = await db.query('SELECT * FROM StudentFeedback');
  
      res.json({
        teacherFeedback,
        studentFeedback,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };