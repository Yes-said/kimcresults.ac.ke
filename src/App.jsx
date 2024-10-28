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

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
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
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
