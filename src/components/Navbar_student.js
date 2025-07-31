import React from 'react'
import './Navbar_student.css';


export default function Navbar_student() {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/'; 
  };
  return (
    <>
    <div>
        <nav className='navbar'>
            <div className='Left'>
                <a href="/Home">Home</a>  
            </div>
            <div className='Right'>
                <a href="./quiz-list">Quizzes</a>  
                <a href="./student-result">Result</a>  
                 <a href="/" onClick={handleLogout}>Logout</a>
            </div>
        </nav>
    </div>
    </>
  )
}
