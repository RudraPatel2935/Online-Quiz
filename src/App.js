import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Add_institution from './components/Add_institution';
import Add_student from './components/Add_student';
import Add_Quiz from './components/Add_Quiz';
import StudentHome from './components/Home';
import Add_teacher from './components/Add_teacher';
import TeacherDashboard from './components/TeacherDashboard';
import AddQuizTeacher from './components/T_Add_Quiz';
import DeleteQuizTeacher from './components/DeleteQuiz';
import Navbar_teacher from './components/Navbar_teacher';
import QuizListPage from './components/QuizListPage';
import QuizPage from './components/QuizPage'; 
import ResultPage from './components/ResultPage';
import ViewResultsPage from './components/ViewResultsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin and student layout */}
        <Route element={<RoleGuard><Layout /></RoleGuard>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-institution" element={<RoleGuard role="admin"><Add_institution /></RoleGuard>} />
          <Route path="/add-student" element={<RoleGuard role="admin"><Add_student /></RoleGuard>} />
          <Route path="/add-quiz" element={<RoleGuard role="admin"><Add_Quiz /></RoleGuard>} />
          <Route path="/add-teacher" element={<RoleGuard role="admin"><Add_teacher /></RoleGuard>} />
          <Route path="/home" element={<RoleGuard role="student"><StudentHome /></RoleGuard>} />
          <Route path="/quiz-list" element={<RoleGuard role="student"><QuizListPage /></RoleGuard>} />

          {/* ✅ Student Quiz Page */}
          <Route path="/quiz/:quizId" element={<RoleGuard role="student"><QuizPage /></RoleGuard>} />
          <Route path="/student-result" element={<RoleGuard role="student"><ResultPage /></RoleGuard>} />

        </Route>

        {/* Teacher layout with Navbar_teacher */}
        <Route element={<RoleGuard role="teacher"><TeacherLayout /></RoleGuard>}>
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/add-quiz1" element={<AddQuizTeacher />} />
          <Route path="/delete-quiz" element={<DeleteQuizTeacher />} />
          <Route path="/view-results" element={<ViewResultsPage/>}/>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// Role-based route guard
function RoleGuard({ children, role }) {
  const currentRole = localStorage.getItem('role');
  if (!currentRole) return <Navigate to="/" />;
  if (role && currentRole !== role) return <Navigate to="/" />;
  return children;
}

// Layout for teacher routes
function TeacherLayout() {
  return (
    <>
      <Navbar_teacher />
      <Outlet />
    </>
  );
}

export default App;
