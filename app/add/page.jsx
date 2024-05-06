'use client'

import React, { useState } from 'react';
import axios from 'axios';

export default function Page() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleSubmit = async () => {
        if (!title || !description) {
            setIsEmpty(true);
            setTimeout(() => {
                setIsEmpty(false);
            }, 3000);
            return;
        }
        setIsEmpty(false);
        try {
            const response = await axios.post('/api/task', {
                title: title,
                description: description
            });
            console.log(response.data); // Handle success, e.g., show a success message
            // Clear the form fields after successful submission
            setTitle('');
            setDescription('');
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                window.location.href = '/';
            }, 3000);
        } catch (error) {
            console.error('Error adding task:', error); // Handle error, e.g., show an error message
        }
    };

    return (
        <div className='mt-14 w-[90%] mx-auto flex flex-col'>
            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-xl">Title :</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full text-xl" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <div className="label">
                    <span className="label-text text-xl">Description :</span>
                </div>
                <textarea className="textarea textarea-bordered w-full h-[300px] resize-none text-xl" placeholder="Bio" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <button className="btn btn-info w-full mt-4" onClick={handleSubmit}>Submit</button>
            </div>
            {isEmpty && (
                <div role="alert" className="alert alert-error mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Warning: Title and description cannot be empty!</span>
                </div>
            )}
            {isSubmitted && (
                <div role="alert" className="alert alert-success mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Your purchase has been confirmed!</span>
                </div>
            )}
        </div>
    )
}
