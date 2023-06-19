import React, { useState } from 'react'
import axios from 'axios';

const Createtask = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");
    const [userToBeAssigned, setUserToBeAssigned] = useState("");
    const [error, setError] = useState("");

    const createTask = async (e) => {
        e.preventDefault();
        const userId = props.userData._id;
        const taskData = {userId, title, description, date, priority};

        if (title || description || date || priority) {
            try {
                await axios.post('http://localhost:3002/dashboard/createTask', taskData, { withCredentials: true });
                props.createTaskCallback("Tasklist");
            } catch (error) {
                setError("An error occurred while creating a task.")
                console.error(error);
            }
        } else {
            setError("All fields are required.");
        }
    };

    return (
        <div className='createtask-cont'>
            <h1>Create a Task</h1>
            <form className='row g-3 createtask-form' onSubmit={createTask}>
                <div className='col-6 position-relative'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    >

                    </input>
                </div>
                <div className='col-md-12 position-relative'>
                    <textarea 
                        className='form-control'
                        rows={10}
                        placeholder='Description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    >

                    </textarea>
                </div>
                <div className='col-md-6 position-relative'>
                    <input 
                        className='form-control'
                        type='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    >

                    </input>
                </div>
                <div className='col-md-6 position-relative'>
                    <select 
                        className='form-select'
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                    >
                    <option value={""}>Priority</option>
                    <option value={"High"}>High</option>
                    </select>
                </div>
                <div className='col-md-6 position-relative'>
                    <select 
                        className='form-select'
                        value={userToBeAssigned}
                        onChange={e => setUserToBeAssigned(e.target.value)}
                    >
                    <option value={""}>Assign to:</option>
                    {props.userData.team.map((value) => {
                        return <option value={value.username}>{value.username}</option>
                    })}
                    </select>
                </div>
                <div className='col-12'>
                    <button className="button btn btn-dark" type="submit" >Create</button>
                </div>
                {error && <p><br />{error}</p>}
            </form>
        </div>
    );
}

export default Createtask