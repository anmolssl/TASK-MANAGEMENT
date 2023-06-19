import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import Register from './pages/Register';

const rootElement = document.getElementById('root');

const app = (
    <Router>
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    </Router>
);

ReactDOM.createRoot(rootElement).render(app);