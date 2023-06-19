import React, { useState } from 'react'
import './App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../components/DashboardPage/Dashboard';

const DashboardPage = () => {

    return (
        <div>
            <Header />
            <Dashboard />
            <Footer />
        </div>
  );
}

export default DashboardPage;