import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Tasklist from './Tasklist';
import Createtask from './Createtask';
import UpdateProfile from './UpdateProfile';
import Team from './Team';

const Dashboard = () => {

    const [user, setUser] = useState(null);
    const [activeComp, setActiveComp] = useState("");
    const [addTeamMemberUsername, setAddTeamMemberUsername] = useState("");

    const handleActiveComp = (event) => {
        setActiveComp(event.target.name);
    };

    const handleCallback = (callbackData) => {
        setActiveComp(callbackData);
    };

    const handleProfileUpdateCallback = (callbackData) => {
        setActiveComp(callbackData);
        fetchUser();
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleAddTeammember = async (e) => {
        e.preventDefault();
        const userId = user._id;
        const teamMemberUsername = addTeamMemberUsername;

        try {
            await axios.post('http://localhost:3002/auth/addTeamMember', {userId, teamMemberUsername}, { withCredentials: true });
            console.log("Team member added successfully.");
            setAddTeamMemberUsername("Team member added successfully.");
            setTimeout(() => {
                setAddTeamMemberUsername("");
            }, 5000);
        } catch (error) {
            console.log(error.response.data.message);
            setAddTeamMemberUsername(error.response.data.message);
            setTimeout(() => {
                setAddTeamMemberUsername("");
            }, 5000);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:3002/dashboard/dashboard', { withCredentials: true });
            
            if (response.status === 200) {
                setUser(response.data);
                setActiveComp("Tasklist");
            } else {
                window.location = "/";
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:3002/auth/logout', { withCredentials: true });
            
            if (response.status === 200) {
                setUser(null);
                window.location = '/';
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    function checkActive(naam) {
        if (naam === activeComp) {
            return "active";
        } else {
            return "";
        }
    };

    return (
        <div className='dashboard'>
            <div className='row dboard-cont'>
                <div className='col-md-6 dboard-left'>

                    <div className='dboard-left-head'>
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                        <a className={"nav-link " + checkActive("Tasklist")} name="Tasklist" onClick={handleActiveComp}>Task List</a>
                                        <a className={"nav-link " + checkActive("Createtask")} name="Createtask" onClick={handleActiveComp}>Create Task</a>
                                        <a className={"nav-link " + checkActive("Assigntask")} name="Assigntask" onClick={handleActiveComp}>Assign Task</a>
                                        <a className={"nav-link " + checkActive("Updatetask")} name="Updatetask" onClick={handleActiveComp}>Update Task</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className='dboard-left-bottom'>
                        {activeComp === "Createtask" 
                            ? <Createtask userData={user} createTaskCallback={handleCallback}/> 
                            : activeComp === "Tasklist" 
                            ? <Tasklist userData={user}/> 
                            : activeComp === "UpdateProfile" 
                            ? <UpdateProfile userData={user} createUpdateProfileCallback={handleProfileUpdateCallback}/> 
                            : activeComp === "Teamlist"
                            ? <Team userData={user}/>
                            : null}
                        {/* : activeComp === "Assigntask" ? <Assigntask userData={user}/> : activeComp === "Updatetask" ? <Updatetask userData={user}/>  */}
                    </div>

                </div>
                <div className='col-md-6 dboard-right'>

                    <h2>{user && user.firstname + " " + user.lastname}</h2>
                    <div>
                        {user && <img src={"http://localhost:3002/" + user.profilepic} className='profile-pic' alt="Profile Picture" />}
                        <h5 className='user-details'>Tasks Assigned to me : </h5>
                        <h5 className='user-details'>Tasks Assigned : </h5>
                        <h5 className='user-details'>Completed Tasks : </h5>
                    </div>
                    <form className='row' onSubmit={handleAddTeammember}>
                        <div className='col-md-12'>
                            <label style={{fontWeight: 'bold', color: "#3282B8"}} htmlFor="addFriend" className='form-label' >Add a team member</label>
                            <div className='input-group'>
                                <input 
                                    className='form-control' 
                                    placeholder='Add by username' 
                                    type='text' 
                                    id='addFriend'
                                    value={addTeamMemberUsername}
                                    onChange={(e) => setAddTeamMemberUsername(e.target.value)}
                                    required />
                                <span style={{padding: "4px"}} className='input-group-text'><button type='submit' className='add-teammem-btn'><span className="material-symbols-outlined add-teammem">done</span></button></span>
                            </div>
                        </div>
                    </form>
                    <button className='team-members' name='Teamlist' onClick={handleActiveComp}>Team</button>
                    <button className='updateprof-btn' name='UpdateProfile' onClick={handleActiveComp}>Update Profile</button>
                    <button className='logout-btn' onClick={handleLogout} >Logout</button>
                    {/* {user && (<h2>{user.firstname} {user.lastname}</h2>)}
                    {user &&  (<a onClick={handleLogout}>Logout</a>)} */}

                </div>
            </div>
        </div>
    );
}

export default Dashboard;