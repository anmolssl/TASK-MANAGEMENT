import React, { useState} from 'react'
import axios from "axios";

const RegisterCont = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({
        firstnameError: "",
        lastnameError: "",
        emailError: "",
        usernameError: "",
        passwordError: "",
        confirmPasswordError: "",
        otherError: ""
    });
    const [isValid, setIsValid] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [isSubmitting, setIsSubmitting] = useState({
        firstname: 2,
        lastname: 2,
        email: 2,
        username: 2,
        password: 2,
        confirmPassword: 2,
    });
    const [showPassword, setShowPassword] = useState(false);

    function emptyIsValid(name, time) {
        setTimeout(() => {
            setIsValid(prevState => ({
                ...prevState,
                [name]: "",
            }));
        }, time);
    };

    const handleVisibility = () => {
        if (showPassword) {
            setShowPassword(false);
        } else if (!showPassword) {
            setShowPassword(true);
        }
    };

    function handleAllBlurEvents() {
        handleFirstNameBlur(null, firstname);
        handleLastNameBlur(null, lastname);
        handleEmailBlur(null, email);
        handleUsernameBlur(null, username);
        handlePasswordBlur(null, password);
        handleConfirmPasswordBlur(null, confirmPassword);
    };

    const handleFirstNameBlur = (event = null, value = firstname) => {
        const firstNameValue = event?.target?.value || value;

        if (!firstNameValue) {
            setError(prevState => ({
                ...prevState,
                firstnameError: !firstNameValue ? "This field is required." : "",
            }));
            setIsValid(prevState => ({
                ...prevState,
                firstname: !firstNameValue ? "is-invalid" : "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                firstname: 0,
            }));
        } else {
            setIsValid(prevState => ({
                ...prevState,
                firstname: "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                firstname: 1,
            }));
        }

        emptyIsValid("firstname", 3000);
    }

    const handleLastNameBlur = (event = null, value = lastname) => {
        const lastNameValue = event?.target?.value || value;

        if (!lastNameValue) {
            setError(prevState => ({
                ...prevState,
                lastnameError: !lastNameValue ? "This field is required." : "",
            }));
            setIsValid(prevState => ({
                ...prevState,
                lastname: !lastNameValue ? "is-invalid" : "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                lastname: 0,
            }));
        } else {
            setIsValid(prevState => ({
                ...prevState,
                lastname: "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                lastname: 1,
            }));
        }

        emptyIsValid("lastname", 3000);
    }

    const handleUsernameBlur = (event = null, value = username) => {
        const usernameValue = event?.target?.value || value;

        if (!usernameValue) {
            setError(prevState => ({
                ...prevState,
                usernameError: !username ? "This field is required." : "",
            }));
            setIsValid(prevState => ({
                ...prevState,
                username: !username ? "is-invalid" : "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                username: 0,
            }));
        } else if (usernameValue.length <= 5) {
            setError(prevState => ({
                ...prevState,
                usernameError: "Username should be more than 5 characters.",
            }));
            setIsValid(prevState => ({
                ...prevState,
                username: "is-invalid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                username: 0,
            }));
        } else {
            setIsValid(prevState => ({
                ...prevState,
                username: "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                username: 1,
            }));
        }

        emptyIsValid("username", 3000);
    };

    const handleEmailBlur = (event = null, value = email) => {
        const emailValue = event?.target?.value || value;

        if (!emailValue) {
            setError(prevState => ({
                ...prevState,
                emailError: !email ? "This field is required." : "",
            }));
            setIsValid(prevState => ({
                ...prevState,
                email: !email ? "is-invalid" : "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                email: 0,
            }));
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
            setError(prevState => ({
                ...prevState,
                emailError: "The entered email is invalid.",
            }));
            setIsValid(prevState => ({
                ...prevState,
                email: "is-invalid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                email: 0,
            }));
        } else {
            setIsValid(prevState => ({
                ...prevState,
                email: "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                email: 1,
            }));
        }

        emptyIsValid("email", 3000);
    };

    const handlePasswordBlur = (event = null, value = password) => {
        const passwordValue = event?.target?.value || value;

        if (!passwordValue) {
            setError(prevState => ({
                ...prevState,
                passwordError: !password ? "This field is required." : "",
            }));
            setIsValid(prevState => ({
                ...prevState,
                password: !password ? "is-invalid" : "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                password: 0,
            }));
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(passwordValue)) {
            setError(prevState => ({
                ...prevState,
                passwordError: "Password must include at least one digit, one lowercase letter, one uppercase letter, and a minimum length of 8 characters.",
            }));
            setIsValid(prevState => ({
                ...prevState,
                password: "is-invalid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                password: 0,
            }));
        } else {
            setIsValid(prevState => ({
                ...prevState,
                password: "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                password: 1,
            }));
        }

        emptyIsValid("password", 3000);
    };

    const handleConfirmPasswordBlur = (event = null, value = confirmPassword) => {
        const confirmPasswordValue = event?.target?.value || value;

        if (!confirmPasswordValue) {
            setError(prevState => ({
                ...prevState,
                confirmPasswordError: !confirmPassword ? "This field is required." : "",
            }));
            setIsValid(prevState => ({
                ...prevState,
                confirmPassword: !confirmPassword ? "is-invalid" : "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                confirmPassword: 0,
            }));
        } else if (confirmPasswordValue !== password) {
            setError(prevState => ({
                ...prevState,
                confirmPasswordError: "Confirm password should match the password.",
            }));
            setIsValid(prevState => ({
                ...prevState,
                confirmPassword: "is-invalid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                confirmPassword: 0,
            }));
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
            setError(prevState => ({
                ...prevState,
                confirmPasswordError: "Password must include at least one digit, one lowercase letter, one uppercase letter, and a minimum length of 8 characters.",
            }));
            setIsValid(prevState => ({
                ...prevState,
                confirmPassword: "is-invalid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                confirmPassword: 0,
            }));
        } else {
            setIsValid(prevState => ({
                ...prevState,
                confirmPassword: "is-valid",
            }));
            setIsSubmitting(prevState => ({
                ...prevState,
                confirmPassword: 1,
            }));
        }

        emptyIsValid("confirmPassword", 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting.firstname === 1 && isSubmitting.lastname === 1 && isSubmitting.email === 1 && isSubmitting.username === 1 && isSubmitting.password === 1 && isSubmitting.confirmPassword === 1) {
            try {
                await axios.post('http://localhost:3002/auth/register', { firstname, lastname, email, username, password }, { withCredentials: true });
                window.location = '/dashboard';
            } catch (error) {
                // setError('An error occurred while registering the user.');
                setError(prevState => ({
                    ...prevState,
                    otherError: error.response.data.message,
                }));
                console.error(error);
            }
        } else {
            handleAllBlurEvents();
        }
    };

    function check(naam) {
        if (isSubmitting[naam] === 1) {
            return "is-valid";
        } else if (isSubmitting[naam] === 0) {
            return "is-invalid";
        } else {
            return "";
        }
    };

    return (
        <div className="right-cont">

            <h2>Sign-up</h2>
            <hr />

            <form className="sign-up row g-4" onSubmit={handleSubmit} >
            <div className='col-md-6 position-relative'>
                <input 
                    className={"form-control " + check("firstname")}
                    type="text" 
                    placeholder="First name" 
                    name='firstname'
                    onChange={(e) => {
                        setFirstName(e.target.value);
                        handleFirstNameBlur(null, e.target.value);
                    }}
                    value={firstname}
                    onBlur={handleFirstNameBlur}
                />
                {isValid.firstname === "" ? null : (<div className={isValid.firstname === "is-valid" ? "valid-tooltip" : "invalid-tooltip"}>
                    {isValid.firstname === "is-invalid" ? error.firstnameError : "Looks good!"}
                </div>)}
            </div>
            <div className='col-md-6 position-relative'>
                <input 
                    className={"form-control " + check("lastname")}
                    type="text" 
                    placeholder="Last name" 
                    name='lastname'
                    onChange={(e) => {
                        setLastName(e.target.value);
                        handleLastNameBlur(null, e.target.value);
                    }}
                    value={lastname}
                    onBlur={handleLastNameBlur}
                />
                {isValid.lastname === "" ? null : <div className={isValid.lastname === "is-valid" ? "valid-tooltip" : "invalid-tooltip"}>
                    {isValid.lastname === "is-invalid" ? error.lastnameError : "Looks good!"}
                </div>}
            </div>
            <div className='col-12 position-relative'>
                <input 
                    className={"form-control " + check("email")}
                    type="email" 
                    placeholder="E-mail" 
                    onChange={(e) => {
                        setEmail(e.target.value);
                        handleEmailBlur(null, e.target.value);
                    }}
                    value={email}
                    onBlur={handleEmailBlur}
                />
                {isValid.email === "" ? null : <div className={isValid.email === "is-valid" ? "valid-tooltip" : "invalid-tooltip"}>
                    {isValid.email === "is-invalid" ? error.emailError : "Looks good!"}
                </div>}
            </div>
            <div className='col-md-7 position-relative'>
                <input 
                    className={"form-control " + check("username")}
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => {
                        setUsername(e.target.value);
                        handleUsernameBlur(null, e.target.value);
                    }}
                    value={username}
                    onBlur={handleUsernameBlur}
                />
                {isValid.username === "" ? null : <div className={isValid.username === "is-valid" ? "valid-tooltip" : "invalid-tooltip"}>
                    {isValid.username === "is-invalid" ? error.usernameError : "Looks good!"}
                </div>}
            </div>
            <div className='col-md-6 position-relative'>
                <div className="input-group">
                <input 
                    className={"form-control " + check("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password" 
                    onChange={(e) => {
                        setPassword(e.target.value);
                        handlePasswordBlur(null, e.target.value);
                    }}
                    value={password}
                    onBlur={handlePasswordBlur}
                />
                <span className="input-group-text" id="validationTooltipUsernamePrepend"><span onClick={handleVisibility} className="eyes material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span></span>
                {isValid.password === "" ? null : <div className={isValid.password === "is-valid" ? "valid-tooltip" : "invalid-tooltip"}>
                    {isValid.password === "is-invalid" ? error.passwordError : "Looks good!"}
                </div>}
                </div>
            </div>
            <div className='col-md-6 position-relative'>
                <input 
                    className={"form-control " + check("confirmPassword")}
                    type="password" 
                    placeholder="Confirm Password" 
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        handleConfirmPasswordBlur(null, e.target.value);
                    }}
                    value={confirmPassword}
                    onBlur={handleConfirmPasswordBlur}
                />
                {isValid.confirmPassword === "" ? null : <div className={isValid.confirmPassword === "is-valid" ? "valid-tooltip" : "invalid-tooltip"}>
                    {isValid.confirmPassword === "is-invalid" ? error.confirmPasswordError : "Looks good!"}
                </div>}
            </div>
            <div className='col-12'>
                <button className="button btn btn-dark" type="submit"  >Register</button>
            </div>

            </form>

            <a href="/" className="create-acc">Already registered? Login.</a>
            {error.otherError && <p><br />{error.otherError}</p>}


        </div>
    );

}

export default RegisterCont;