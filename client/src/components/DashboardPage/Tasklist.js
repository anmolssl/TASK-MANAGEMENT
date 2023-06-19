import React, { useEffect, useState } from 'react'
import axios from 'axios';

function checkDueDate(taskDate) {
    const date1 = new Date(taskDate).getTime();
    const date2 = new Date().getTime();
  
    if (date2 >= date1) {
        return "red";
    } else {
        return "black";
    }
}

const Tasklist = (props) => {

    const [tasklist, setTasklist] = useState([]);
    const [error, setError] = useState("");
    const [showTask, setTask] = useState("");
    const [showTasklist, setList] = useState(true);

    const handleShowTask = (event) => {
        const title = event.target.textContent;

        setTask(title);
        setList(false);
    };

    const handleShowTasklist = () => {
        setTask("");
        setList(true);
    };

    const deleteTask = async (event) => {
        const taskId = event.currentTarget.getAttribute("data-value");

        try {
            await axios.post('http://localhost:3002/dashboard/deleteTask', { taskId }, { withCredentials: true });
            setTask("");
            fetchList();
            setList(true);
        } catch (error) {
            console.error(error);
            setError("An error occurres while deleting task.")
        }
    };

    const fetchList = async () => {
        const userId = props.userData._id;

        try {
            const response = await axios.get('http://localhost:3002/dashboard/tasklist?ID=' + userId, { withCredentials: true, timeout: 10000 });
            
            if (response.status === 200) {
                setTasklist(response.data.tasklist);
            } else {
                setError("An error occurred while accessing task list.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while accessing task list.");
        }
    };

    useEffect(() => {

        fetchList();

    }, []);

    function findTask (task) {
        return task.title === showTask;
    };

    return (
        <div className='tasklist-cont'>
            <h1>Task List</h1>
            <div className='tasklist'>
                {tasklist && showTasklist && tasklist.map((value) => {
                    return (
                        <div key={value._id}>
                            <h2 className='list-title' onClick={handleShowTask}>{value.title}</h2>
                            <h6 style={{color: checkDueDate(value.date)}}  className='list-date'>Due date: {value.date}</h6>
                        </div>
                    )
                })}
                {tasklist && showTask && (
                    <div key={tasklist.find(findTask)._id}>
                        <span className="material-symbols-outlined back-arrow" onClick={handleShowTasklist}>arrow_back</span>
                        <div data-value={tasklist.find(findTask)._id} onClick={deleteTask} className='close-btn'><span className="material-symbols-outlined" style={{color: "black", margin: 0}}>Delete</span><p style={{margin: 0}}>Delete task</p></div>
                        <h1 className='task-title'>{tasklist.find(findTask).title}</h1>
                        <h5 style={{color: checkDueDate(tasklist.find(findTask).date)}}  className='task-date'>Due date: {tasklist.find(findTask).date}</h5>
                        <h6 className='task-priority'>Priority: {tasklist.find(findTask).priority}</h6>
                        <p className='task-description'>{tasklist.find(findTask).description}</p>
                    </div>
                )}
            </div>
            {error && <p><br />{error}</p>}
        </div>
    );
}

export default Tasklist;