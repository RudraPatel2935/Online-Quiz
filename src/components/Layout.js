import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar_admin from './Navbar_admin';
import Navbar_student from './Navbar_student';

export default function Layout() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';
  const role = localStorage.getItem('role');

  return (
    <>
      {showNavbar && (
        <>
          {role === 'admin' && <Navbar_admin />}
          {role === 'student' && <Navbar_student />}
        </>
      )}
      <Outlet />
    </>
  );
}
