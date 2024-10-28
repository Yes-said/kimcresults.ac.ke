import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Layout from './Layout.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContextProvider.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';
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
          {/* <Route path="/account" element={<LoginPage />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
