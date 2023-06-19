        
        // Old Form Validation Backup Logic
        
        
        
        // if (!firstname || !lastname || !email || !username || !password || !confirmPassword) {
        //     setIsSubmitting(2);
        //     // setError('All fields are required.');
        //     setError(prevState => ({
        //         ...prevState,
        //         firstnameError: !firstname ? "This field is required." : "",
        //         lastnameError: !lastname ? "This field is required." : "",
        //         emailError: !email ? "This field is required." : "",
        //         usernameError: !username ? "This field is required." : "",
        //         passwordError: !password ? "This field is required." : "",
        //         confirmPasswordError: !confirmPassword ? "This field is required." : "",
        //     }));
        //     setIsValid(prevState => ({
        //         ...prevState,
        //         firstname: !firstname ? "is-invalid" : "is-valid",
        //         lastname: !lastname ? "is-invalid" : "is-valid",
        //         email: !email ? "is-invalid" : "is-valid",
        //         username: !username ? "is-invalid" : "is-valid",
        //         password: !password ? "is-invalid" : "is-valid",
        //         confirmPassword: !confirmPassword ? "is-invalid" : "is-valid",
        //     }));
        //     emptyIsValid(2000);
        // } else if (!/\S+@\S+\.\S+/.test(email)) {
        //     setIsSubmitting(2);
        //     // setError('The entered email is invalid.');
        //     setError(prevState => ({
        //         ...prevState,
        //         emailError: "The entered email is invalid.",
        //     }));
        //     setIsValid(prevState => ({
        //         ...prevState,
        //         email: "is-invalid",
        //     }));
        // } else if (username.length < 5) {
        //     setIsSubmitting(2);
        //     // setError('Username should be more than 5 characters.');
        //     setError(prevState => ({
        //         ...prevState,
        //         usernameError: "Username should be more than 5 characters.",
        //     }));
        //     setIsValid(prevState => ({
        //         ...prevState,
        //         username: "is-invalid",
        //     }));
        // } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        //     setIsSubmitting(2);
        //     // setError('Password must include at least one digit, one lowercase letter, one uppercase letter, and a minimum length of 8 characters.');
        //     setError(prevState => ({
        //         ...prevState,
        //         passwordError: "Password must include at least one digit, one lowercase letter, one uppercase letter, and a minimum length of 8 characters.",
        //     }));
        //     setIsValid(prevState => ({
        //         ...prevState,
        //         password: "is-invalid",
        //     }));
        // } else if (confirmPassword !== password) {
        //     setIsSubmitting(2);
        //     // setError('Confirm password should match the password.');
        //     setError(prevState => ({
        //         ...prevState,
        //         confirmPasswordError: "Confirm password should match the password.",
        //     }));
        //     setIsValid(prevState => ({
        //         ...prevState,
        //         confirmPassword: "is-invalid",
        //     }));
        // } else {
        //     try {
        //     await axios.post('http://localhost:3002/register', { firstname, lastname, email, username, password }, { withCredentials: true });
        //     window.location = '/dashboard';
        //     } catch (error) {
        //     // setError('An error occurred while registering the user.');
        //     setError(prevState => ({
        //         ...prevState,
        //         otherError: "An error occurred while registering the user.",
        //     }));
        //     console.error(error);
        //     }
        // }