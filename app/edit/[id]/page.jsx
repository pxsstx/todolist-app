'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function page() {
  const params = useParams();

  const id = params.id
  const [task, setTask] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Perform your data fetching logic here
        const response = await fetch(`http://localhost:3000/api/getById/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setTask(result); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    // Call fetchData function when the component mounts
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
  event.preventDefault();
  const title = event.target.title.value.trim(); // Trim whitespace
  if (!title) {
    setError('Title cannot be empty');
    setTimeout(() => setError(null), 5000);
    return;
  }
  try {
    const response = await fetch(`http://localhost:3000/api/getById/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: event.target.description.value,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    setSuccess(true);
    setTimeout(10000);
    window.location.reload();
  } catch (error) {
    console.error('Error updating task:', error);
    // Handle error, maybe show an error message
  }
};

  return (
    <div className='w-[80vw] lg:w-[80vw] xl:w-[60vw] mx-auto h-[100vh] mt-44 fixed'>
      <h1 className='text-4xl mb-10 text-center'>Edit Task</h1>
      <section className="bg-gray-2 rounded-xl">
        <div className="p-8 shadow-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="form-label text-base mb-2">
                <h1>Title :</h1>
              </label>
              <input className="input input-solid max-w-full" placeholder={task.title} type="text" id="title" />
            </div>

            <div className="w-full">
              <label className="form-label text-base mb-2">
                <h1>Description :</h1>
              </label>
              <textarea className="textarea textarea-solid max-w-full resize-none" placeholder={task.description} rows="8" id="description"></textarea>
            </div>

            <div className="mt-4">
              <button type="submit" className="rounded-lg btn btn-primary btn-block">Submit</button>
            </div>
          </form>
        </div>
      </section>
      {success && ( // Conditionally render the success alert
        <div className="alert alert-success mt-10">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z" fill="#00BA34" />
          </svg>
          <div className="flex flex-col">
            <span>Title</span>
            <span className="text-content2">Long sample text</span>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-error mt-10">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
          </svg>
          <div className="flex flex-col">
            <span>Title</span>
            <span className="text-content2">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
