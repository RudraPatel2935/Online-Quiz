const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

// Add quiz
router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const quizzes = db.collection('quizzes');

    const { title, subject, timeLimit, questions } = req.body;

    if (!title || !subject || !timeLimit || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const lastQuiz = await quizzes.find().sort({ _id: -1 }).limit(1).toArray();

    let newIdNumber = 1;

    if (lastQuiz.length > 0) {
      const lastId = lastQuiz[0]._id; // e.g., "QUIZ001"
      const numPart = parseInt(lastId.replace('QUIZ', ''), 10);
      newIdNumber = numPart + 1;
    }

    
    const newQuizId = 'QUIZ' + newIdNumber.toString().padStart(3, '0');

    const result = await quizzes.insertOne({
      _id: newQuizId,
      title,
      subject,
      timeLimit,
      questions
    });

    res.status(201).json({ message: 'Quiz added successfully', id: newQuizId });
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all quizzes (only selected fields)
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const quizzes = db.collection('quizzes');

    const allQuizzes = await quizzes.find({}, {
      projection: { _id: 1, title: 1, subject: 1, timeLimit: 1 }  // 👈 added _id too
    }).toArray();

    res.json(allQuizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete quiz by ID (string ID like "QUIZ001")
router.delete('/:id', async (req, res) => {
  try {
    const db = getDB();
    const quizzes = db.collection('quizzes');
    const { id } = req.params;

    const result = await quizzes.deleteOne({ _id: id }); // 👈 removed ObjectId

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Quiz deleted successfully' });
    } else {
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET quiz by quizId (case-insensitive)
router.get('/:quizId', async (req, res) => {
  const { quizId } = req.params;
  const db = getDB();
  const quizzes = db.collection('quizzes');

  try {
    const quiz = await quizzes.findOne({ _id: quizId });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found.' });
    }

    res.json(quiz);
  } catch (err) {
    console.error('Error fetching quiz:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});



router.post('/submit', async (req, res) => {
  try {
    const db = getDB();
    const submissions = db.collection('submissions');

    const { quizId, rollNo, answers, score } = req.body;

    console.log('Received:', { quizId, rollNo, answers, score });

    if (!quizId || !rollNo || !Array.isArray(answers) || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid submission data.' });
    }

    const submissionData = {
      quizId: String(quizId),
      rollNo: String(rollNo),
      answers,
      score,
      submittedAt: new Date()
    };

    const result = await submissions.insertOne(submissionData);

    res.status(200).json({ message: 'Submission saved.', submissionId: result.insertedId });
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ error: 'Failed to save submission.' });
  }
});


router.get("/student-results/:rollNo", async (req, res) => {
  try {
    const db = getDB();
    const submissions = db.collection("submissions");
    const rollNoParam = req.params.rollNo;

    const data = await submissions.find({ rollNo: rollNoParam }).toArray();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No submissions found for rollNo: " + rollNoParam });
    }

    res.json(data);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
});

// Get all results (for teachers, with optional filters)
// GET /api/quiz/results
// router.get("/results", async (req, res) => {
//   try {
//     const db = getDB();
//     const submissions = db.collection("submissions");

//     const allSubmissions = await submissions.find().toArray();
//     res.json(allSubmissions);
//   } catch (err) {
//     console.error("Error fetching all submissions:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// GET submissions with filter (by rollNo or quizId or both)
router.get("/results/filter", async (req, res) => {
  try {
    const db = getDB();
    const submissions = db.collection("submissions");

    const { rollNo, quizId } = req.query;
    const filter = {};
    if (rollNo) filter.rollNo = rollNo;
    if (quizId) filter.quizId = quizId;

    const filtered = await submissions.find(filter).toArray();
    res.json(filtered);
  } catch (err) {
    console.error("Error fetching filtered submissions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
