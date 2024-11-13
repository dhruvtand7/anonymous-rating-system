// backend/controllers/user.controller.js
const User = require('../models/user.model');
const db = require('../config/db.config');

exports.getTeachers = async (req, res) => {
  try {
    const [teachers] = await db.query(
      `SELECT u.user_id, u.name, t.department 
       FROM User u 
       JOIN Teacher t ON u.user_id = t.teacher_id`
    );
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const [students] = await db.query(
      `SELECT u.user_id, u.name, s.section_id 
       FROM User u 
       JOIN Student s ON u.user_id = s.student_id`
    );
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};