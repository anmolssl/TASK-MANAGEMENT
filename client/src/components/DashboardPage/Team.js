import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Team = (props) => {

    const [team, setTeam] = useState([]);
    const [error, setError] = useState("");
    const [showTeamMember, setTeamMember] = useState("");
    const [showTeam, setShowTeam] = useState(true);
    const [fakeProducts, setFakeProducts] = useState("");

    const handleShowTeamMember = (event) => {
        const username = event.target.textContent;

        setTeamMember(username);
        setShowTeam(false);
    };

    const handleShowTeamList = () => {
        setTeamMember("");
        setShowTeam(true);
    };

    // const deleteTask = async (event) => {
    //     const taskId = event.currentTarget.getAttribute("data-value");

    //     try {
    //         await axios.post('http://localhost:3002/dashboard/deleteTask', { taskId }, { withCredentials: true });
    //         setTask("");
    //         fetchList();
    //         setList(true);
    //     } catch (error) {
    //         console.error(error);
    //         setError("An error occurres while deleting task.")
    //     }
    // };

    // const fetchList = async () => {
    //     const userId = props.userData._id;

    //     try {
    //         const response = await axios.get('http://localhost:3002/dashboard/tasklist?ID=' + userId, { withCredentials: true, timeout: 10000 });
            
    //         if (response.status === 200) {
    //             setTasklist(response.data.tasklist);
    //         } else {
    //             setError("An error occurred while accessing task list.");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setError("An error occurred while accessing task list.");
    //     }
    // };

    useEffect(() => {

        // fetchList();
        setTeam(props.userData.team);

    }, []);

    function findTeamMember (team) {
        return team.username === showTeamMember;
    };

    return (
        <div className='tasklist-cont'>
            <h1>Team</h1>
            <div className='tasklist'>
                {team && showTeam && team.map((value) => {
                    return (
                        <div key={value._id}>
                            <h2 className='list-title' onClick={handleShowTeamMember}>{value.username}</h2>
                        </div>
                    )
                })}
                {team && showTeamMember && (
                    <div key={team.find(findTeamMember)._id}>
                        <span className="material-symbols-outlined back-arrow" onClick={handleShowTeamList}>arrow_back</span>
                        {/* <div data-value={tasklist.find(findTask)._id} onClick={deleteTask} className='close-btn'><span className="material-symbols-outlined" style={{color: "black", margin: 0}}>Delete</span><p style={{margin: 0}}>Delete task</p></div> */}
                        <h1 className='task-title'>{team.find(findTeamMember).username}</h1>
                        <h5 className='task-date'>Due date: {team.find(findTeamMember).firstname}</h5>
                        <h6 className='task-priority'>Priority: {team.find(findTeamMember).lastname}</h6>
                        <p className='task-description'>{team.find(findTeamMember).email}</p>
                    </div>
                )}
            </div>
            {error && <p><br />{error}</p>}
        </div>
    );
}

export default Team;