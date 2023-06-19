import React from "react";
import './App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftCont from "../components/Register/LeftCont"
import RegisterCont from "../components/Register/RegisterCont";

function Register() {
    return (
        <div>
            <Header />
            <div className="cont">
                <LeftCont />
                <RegisterCont />
            </div>
            <Footer />
        </div>
    );
}

export default Register;