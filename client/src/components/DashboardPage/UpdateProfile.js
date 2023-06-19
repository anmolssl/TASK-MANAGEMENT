import React, { useState } from 'react'
import axios from 'axios';

const UpdateProfile = (props) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [profilepic, setProfilepic] = useState("");
    const [error, setError] = useState("");

    const updateProfile = async (e) => {
        e.preventDefault();
        const userId = props.userData._id;
        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('profilepic', profilepic);
        formData.append('userId', userId);
        // const taskData = {userId, firstname, lastname, profilepic};

        try {
            await axios.post('http://localhost:3002/auth/updateProfile', formData, { headers: {'Content-Type': 'multipart/form-data'}}, { withCredentials: true });
            props.createUpdateProfileCallback("Tasklist");
        } catch (error) {
            setError("An error occurred while updating profile.")
            console.log(error);
        }
    };

    return (
        <div className='createtask-cont'>
            <h1>Update Profile</h1>
            <form className='row g-3 createtask-form' onSubmit={updateProfile} encType="multipart/form-data">
                <div className='col-6 position-relative'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='Firstname'
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                    >

                    </input>
                </div>
                <div className='col-md-6 position-relative'>
                    <input 
                        className='form-control'
                        type="text"
                        placeholder='Lastname'
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                    >

                    </input>
                </div>
                <div className='col-md-6 position-relative'>
                    <input 
                        className='form-control'
                        type='file'
                        onChange={e => setProfilepic(e.target.files[0])}
                    >

                    </input>
                </div>
                <div className='col-12'>
                    <button className="button btn btn-dark" type="submit" >Update</button>
                </div>
                {error && <p><br />{error}</p>}
            </form>
        </div>
    );
}

export default UpdateProfile;