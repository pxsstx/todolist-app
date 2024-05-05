'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {

        const search = localStorage.getItem("searchData");
        setSearchData(search || ""); // Set searchData to the value from localStorage, or an empty string if it's null

        const activeTab = localStorage.getItem("activeTab");
        setFilter(activeTab || "All");

        const fetchData = async () => {
            try {
                let url = "http://localhost:3000/api/getAll/";
                if (searchData !== "") {
                    url = `http://localhost:3000/api/getBySearch/${searchData}`;
                } else if (filter === 'Completed' || filter === '1') {
                    url = "http://localhost:3000/api/getByFilter/1";
                } else if (filter === "Uncompleted" || filter === '0') {
                    url = "http://localhost:3000/api/getByFilter/0";
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setTasks(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filter, searchData]); // Watch for changes in filter and searchData

    const handleToggleChange = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/getById/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
        window.location.reload();
    };

    return (
        <div className='flex gap-y-4 h-full'>
            <div className=' flex flex-col gap-y-4 w-full overflow-y-scroll'>
                {tasks.map((task, index) => (
                    <div key={index} className="card max-w-full w-full grid grid-rows-[20%_60%_10%] max-h-[300px] bg-base-100 shadow-xl border-2 rounded-lg border-primary ">
                        <div className="card-body">
                            <h2 className="card-title">{task.title}</h2>
                            <p className="text-md">{task.description}</p>
                            <div className="card-actions flex justify-between align-bottom items-center">
                                <div>
                                    <input
                                        type="checkbox"
                                        className="checkbox-error checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleChange(index)}
                                    />
                                </div>
                                <div className="flex gap-x-4 justify-end">
                                    <Link href={`/edit/${task.id}`}><button className="btn bg-border">Edit</button></Link>
                                    <button type="button" className="rounded-lg btn bg-border" onClick={() => handleDelete(task.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;
