import React from "react";
import './App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftCont from "../components/LandingPage/LeftCont";
import RightCont from "../components/LandingPage/RightCont";

function LandingPage() {
    return (
        <div>
            <Header />
            <div className="cont">
                <LeftCont />
                <RightCont />
            </div>
            <Footer />
        </div>
    );
}

export default LandingPage;