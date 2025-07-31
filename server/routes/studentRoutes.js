const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

router.post('/', async (req, res) => {
  try {
    const { institutionId, email, roll, username, password } = req.body;

    if (!institutionId || !email || !roll || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const db = getDB();
    const users = db.collection('users');
    const institutions = db.collection('institutions');

    const institutionExists = await institutions.findOne({ _id: institutionId });
    if (!institutionExists) {
      return res.status(400).json({ error: 'Invalid institutionId. Institution does not exist.' });
    }

    let newId = "STU001";
    try {
      const lastStudent = await users
        .find({ _id: { $regex: /^STU\d+$/ } })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      if (lastStudent.length > 0) {
        const lastId = lastStudent[0]._id;
        const number = parseInt(lastId.replace("STU", ""));
        const nextNumber = number + 1;
        newId = `STU${String(nextNumber).padStart(3, '0')}`;
      }
    } catch (idErr) {
      console.error('ID generation failed:', idErr);
      return res.status(500).json({ error: 'Failed to generate student ID' });
    }

    const newStudent = {
      _id: newId,
      role: 'student',
      institutionId,
      email,
      roll,
      username,
      password 
    };

    const result = await users.insertOne(newStudent);

    console.log('New student added:', newStudent);

    res.status(201).json({
      message: 'Student registered successfully',
      id: result.insertedId
    });

  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
