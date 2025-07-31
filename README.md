# Online-Quiz Introduction
Online Quiz System is a web-based application that allows students to attempt quizzes online from anywhere. The system provides a user-friendly interface where students can log in, select a quiz, and answer multiple-choice questions within a given time limit.

# Project Overview
The Online Quiz System is a web application that allows:<br>
-> Admins to manage users and quizzes.<br>
-> Teachers to create quizzes and view results.<br>
-> Students to view and attempt quizzes, and see their scores.<br>

# Overall Development Process
-> Designed database schemas for Users, Quizzes, and Results.<br>
-> Implemented role-based login and authentication.<br>
-> Created Admin Dashboard:<br>
    -> Add students, teachers, institution and Quiz<br>
    -> Create quizzes with title, subject, time limit<br>
-> Created Teacher Dashboard:<br>
    -> Add new quizzes and View Student score.<br>
-> Student Interface:<br>
    -> Quiz listing page with filtering by subject.<br>
    -> Quiz Attempt Page with countdown timer and auto-submission after time expiry.<br>
    -> Student Result Page to view scores.<br>

# Main Features
->  Role-based login (Admin/Teacher/Student).<br>
->  Admin: Add users & create quizzes.<br>
->  Teacher: Add quizzes, view student results.<br>
->  Student: View/Attempt quizzes, auto-submission on timer expiry.<br>
->  Student can view their score in a result page.<br>
->  Real-time filtering of quizzes and results.<br>

# Difficulties Faced
-> Structuring MongoDB queries for filters (subject/title and roll number).<br>
-> Ensuring responsive UI for all dashboards and pages.<br>
