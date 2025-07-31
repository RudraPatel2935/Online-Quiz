const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

router.post('/', async (req, res) => {
  try {
    const { institutionId, email, subject, username, password } = req.body;

    if (!institutionId || !email || !subject || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const db = getDB();
    const users = db.collection('users');
    const institutions = db.collection('institutions');

    const institutionExists = await institutions.findOne({ _id: institutionId });
    if (!institutionExists) {
      return res.status(400).json({ error: 'Invalid institution ID' });
    }

    const lastTeacher = await users
      .find({ _id: { $regex: /^TEA\d+$/ } })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    let newId = "TEA001";
    if (lastTeacher.length > 0) {
      const lastId = lastTeacher[0]._id;
      const number = parseInt(lastId.replace("TEA", ""));
      const nextNumber = number + 1;
      newId = `TEA${String(nextNumber).padStart(3, '0')}`;
    }

    const newTeacher = {
      _id: newId,
      role: 'teacher',
      institutionId,
      email,
      subject,
      username,
      password,
    };

    const result = await users.insertOne(newTeacher);
    res.status(201).json({ message: 'Teacher added successfully', id: result.insertedId });

  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
