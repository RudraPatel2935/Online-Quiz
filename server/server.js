const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const institutionRoutes = require('./routes/institutionRoutes');
const studentRoutes = require('./routes/studentRoutes');
const quizRoutes = require('./routes/quizRoutes');
const loginRoutes = require('./routes/loginRoutes'); 
const teacherRoutes = require('./routes/teacherRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    app.use('/api/institutions', institutionRoutes);
    app.use('/api/students', studentRoutes);
    app.use('/api/quiz', quizRoutes);
    app.use('/api/login', loginRoutes); 
    app.use('/api/teachers', teacherRoutes);
    


    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });
