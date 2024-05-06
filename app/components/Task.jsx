'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { IoMdAdd } from 'react-icons/io';

function Task() {
    const [tasks, setTasks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isCompleted, setIsCompleted] = useState(null);

    useEffect(() => {
        const savedSearchData = localStorage.getItem("searchData");
        if (savedSearchData) {
            setSearchText(savedSearchData);
        }
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchText(value);
        localStorage.setItem("searchData", value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Optionally, you can reload the page after form submission
        // window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/task');
                setTasks(response.data[0]);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const [activeTab, setActiveTab] = useState("All");

    // Function to handle tab click
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        localStorage.setItem("activeTab", `"${tabName}"`)
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredTasks = tasks.filter((task) => {
        const lowerCaseSearchText = searchText.toLowerCase();
        console.log(activeTab)
        if (activeTab === "Completed") {
            return task.completed === 1;
        } else if (activeTab === "Uncompleted") {
            return task.completed === 0;
        } else {
            return lowerCaseSearchText === '' || task.title.toLowerCase().includes(lowerCaseSearchText);
        }
    });

    const handleCheckboxChange = async (taskId, currentCompletedStatus) => {
        try {
            // Calculate the new completed status (toggle between 1 and 0)
            const newCompletedStatus = currentCompletedStatus === 0 ? 1 : 0;
            // Send a PUT request to update the task's completed status
            await axios.post(`/api/task/${taskId}`, { completed: newCompletedStatus });
            window.location.reload()
        } catch (error) {
            // Handle error
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            // Send a DELETE request to delete the task
            await axios.delete(`/api/task/${taskId}`);
            // Optionally, you can update the UI or state after successful deletion
            // For example, you can refetch the tasks data to reflect the changes
            window.location.reload()
        } catch (error) {
            // Handle error
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <div className="w-full h-full mt-10 gap-5">
                <div className="grid grid-cols-1 align-bottom items-center mt-5 content-between gap-y-5 mb-8">
                    <div className='w-full flex flex-row gap-x-4 h-10'>
                        <input
                            className="input max-w-full w-full h-full input-bordered"
                            placeholder="Search task..."
                            value={searchText}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='w-full'>
                        <Link href={'/add'}><button className="btn w-full"><h1>Add Task</h1><IoMdAdd className='ml-4' size={20} /></button></Link>
                    </div>
                    <div className='max-w-fit'>
                        <div className=" h-[35px] flex gap-x-5">
                            <button className={`btn w-fit text-md ${activeTab === 'All' ? ' btn-active font-bold' : 'font-normal'} px-5`} onClick={() => handleTabClick('All')}>All</button>
                            <button className={`btn w-fit text-md ${activeTab === 'Completed' ? 'btn-active font-bold' : 'font-normal'} px-3`} onClick={() => handleTabClick('Completed')}> Completed</button>
                            <button className={`btn w-fit text-md ${activeTab === 'Uncompleted' ? ' btn-active  font-bold' : 'font-normal'} px-3`} onClick={() => handleTabClick('Uncompleted')}> Uncompleted</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-y-4 h-[530px] fixed w-[80vw] lg:w-[80vw] xl:w-[60vw]'>
                <div className='flex flex-col gap-y-4 w-full overflow-y-scroll'>
                    {filteredTasks.map(task => (
                        <div key={task.id} className="card w-full bg-base-200 text-base-content">
                            <div className="card-body">
                                <h2 className="card-title">{task.title || 'No Title'}</h2>
                                <p>{task.description}</p>
                                <div className="card-actions justify-between">
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            className="checkbox checkbox-primary"
                                            onChange={() => {
                                                handleCheckboxChange(task.id, task.completed);
                                            }} />
                                    </div>
                                    <div className='justify-end'>
                                        <Link href={`/edit/${task.id}`}><div className="btn btn-info">Edit</div></Link>
                                        <div className="btn btn-error ml-4" onClick={() => handleDelete(task.id)}>Delete</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Task;

