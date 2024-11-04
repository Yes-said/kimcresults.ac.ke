import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Layout from './Layout.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContextProvider.jsx';
import About from './pages/About.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AccountPage from './AccountPage.jsx';
import Dashboard from './pages/DashboardPage.jsx';
import ManageStudents from './pages/ManageStudents.jsx';
 import ManageTeachers from './pages/ManageTeachers.jsx';
import ManageCourses from './pages/ManageCourses.jsx';
import AddNewCourse from './pages/AddNewCourse.jsx';
import AddNewStudent from './pages/AddNewStudent.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EditStudent from './pages/EditStudent.jsx';
import CreateTeacher from './pages/CreateTeacher.jsx';
import EditTeacher from './pages/EditTeachers.jsx';
<Route path="/manage-teachers/edit/:id" element={<EditTeacher />} />
// import ManageResults from './pages/ManageResults.jsx';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/account/:subpage" element={<AccountPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/manage-students" element={<ManageStudents />} />
                    <Route path="/manage-teachers" element={<ManageTeachers />} /> 
                    <Route path="/manage-courses" element={<ManageCourses />} />
                    <Route path="/students/edit/:id" element={<EditStudent />} />
                    <Route path="/manage-teachers/edit/:id" element={<EditTeacher />} />
                    <Route path="/courses/new" element={<AddNewCourse />} />
                    <Route path="/manage-students/create" element={<AddNewStudent />} />
                    <Route path="/manage-teachers/create" element={<CreateTeacher />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    {/* <Route path="/manage-results" element={<ManageResults />} />  */}
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

