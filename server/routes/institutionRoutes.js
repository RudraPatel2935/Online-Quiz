const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const institutions = await db.collection('institutions').find().toArray();
    res.json(institutions);
  } catch (err) {
    console.error('Failed to get institutions:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, code, address } = req.body;

    if (!name || !code) {
      return res.status(400).json({ error: 'Name and code are required' });
    }

    const db = getDB();
    const institutions = db.collection('institutions');

    // Get the latest _id in the format INSTxxx
    const lastInstitution = await institutions
      .find({ _id: { $regex: /^INST\d+$/ } })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    let newId = "INST001";
    if (lastInstitution.length > 0) {
      const lastId = lastInstitution[0]._id;
      const number = parseInt(lastId.replace("INST", ""));
      const nextNumber = number + 1;
      newId = `INST${String(nextNumber).padStart(3, '0')}`;
    }

    const newInstitution = {
      _id: newId,
      name,
      code,
      address
    };

    const result = await institutions.insertOne(newInstitution);
    res.json({ message: 'Institution added successfully', id: result.insertedId });

  } catch (error) {
    console.error('Error adding institution:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
