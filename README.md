# Online-Quiz Introduction
Online Quiz System is a web-based application that allows students to attempt quizzes online from anywhere. The system provides a user-friendly interface where students can log in, select a quiz, and answer multiple-choice questions within a given time limit.

# Project Overview
The Online Quiz System is a web application that allows:
-> Admins to manage users and quizzes.<br>
-> Teachers to create quizzes and view results.
-> Students to view and attempt quizzes, and see their scores.

# Overall Development Process
-> Designed database schemas for Users, Quizzes, and Results.
-> Implemented role-based login and authentication.
-> Created Admin Dashboard:
    -> Add students, teachers, institution and Quiz
    -> Create quizzes with title, subject, time limit
-> Created Teacher Dashboard:
    -> Add new quizzes and View Student score.
-> Student Interface:
    -> Quiz listing page with filtering by subject.
    -> Quiz Attempt Page with countdown timer and auto-submission after time expiry.
    -> Student Result Page to view scores.

# Main Features
->  Role-based login (Admin/Teacher/Student).
->  Admin: Add users & create quizzes.
->  Teacher: Add quizzes, view student results.
->  Student: View/Attempt quizzes, auto-submission on timer expiry.
->  Student can view their score in a result page.
->  Real-time filtering of quizzes and results.

# Difficulties Faced
-> Structuring MongoDB queries for filters (subject/title and roll number).
-> Ensuring responsive UI for all dashboards and pages.
