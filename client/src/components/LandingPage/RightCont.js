import React, { useState } from 'react'
import axios from "axios";

const RightCont = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleVisibility = () => {
        if (showPassword) {
            setShowPassword(false);
        } else if (!showPassword) {
            setShowPassword(true);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3002/auth/login', { username, password }, { withCredentials: true });
            window.location = "/dashboard";
        } catch (error) {
            setError('Invalid username or password.');
            console.error(error);
        }
    };

    return (
        <div className='right-cont'>
            <h2>Sign-in</h2>
            <hr />

            <form className="sign-in row g-3" onSubmit={handleLogin} >
            <div>
                <input 
                    className="form-control" 
                    type="text" 
                    placeholder="E-mail/Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <div className="input-group">
                <input 
                    className="form-control" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="input-group-text" id="validationTooltipUsernamePrepend"><span onClick={handleVisibility} className="eyes material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span></span>
                </div>
            </div>
            <div className='col-12'>
                <button className="button btn btn-dark" type="submit">Login</button>
            </div>
                <a href="/register" className="create-acc">Create an account.</a>
                {error && <p>{error}</p>}
            </form>

        </div>
    );

}

export default RightCont;