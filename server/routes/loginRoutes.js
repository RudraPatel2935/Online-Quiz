const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

router.post('/', async (req, res) => {
  const { institutionId, username, roll, password } = req.body;

  if (!institutionId || !username || !password) {
    return res.status(400).json({ error: 'Institution, username, and password are required' });
  }

  const db = getDB();
  const institutions = db.collection('institutions');
  const users = db.collection('users');

  const institution = await institutions.findOne({ _id: institutionId });
  if (!institution) {
    return res.status(404).json({ error: 'Institution not found' });
  }

  // Try finding the user (students use roll, others don’t)
  let user;
  if (roll) {
    // Student login
    user = await users.findOne({ institutionId, username, roll, password });
  } else {
    // Teacher/Admin login (no roll)
    user = await users.findOne({ institutionId, username, password });
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    message: 'Login successful',
    role: user.role,
    username: user.username,
    institution: institution.name
  });
});

module.exports = router;
