import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Layout from './Layout.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import CoursesFormPage from './pages/CoursesFormPage.jsx';
import ResultsFormPage from './pages/ResultsFormPage.jsx';
import Result from './pages/Result.jsx';
import MyResults from './pages/MyResults.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import CreateNewsFormPage from './pages/CreateNewsFormPage.jsx';
import UpdateResults from './pages/UpdateResults.jsx';
import About from './pages/About.jsx';
import ContactPage from './pages/ContactPage.jsx';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/courses" element={<CoursesPage />} />
          <Route path="/account/admin-controls" element={<ResultsFormPage />} />
          <Route path="/account/view" element={<Result />} />
          <Route path="/account/post" element={<CreateNewsFormPage />} />
          <Route path="/account/results" element={<MyResults />} />
          <Route path="/update-result/:id" element={<UpdateResults />} /> {/* Route for update */}
          <Route path="/account/courses/new" element={<CoursesFormPage />} />
          <Route path="/account/courses/:id" element={<CoursesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
