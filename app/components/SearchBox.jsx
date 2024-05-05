"use client"

import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

function SearchBox() {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("searchData", searchText);
        window.location.reload();
        localStorage.setItem("searchData","");
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit(event);
        }
    }

    return (
        <form className="w-full flex gap-x-4 h-10" onSubmit={handleSubmit}>
            <input
                className="input max-w-full w-full h-full"
                placeholder="Search task..."
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button className="btn max-w-fit h-full" type="submit">
                <IoMdSearch size={20} />
            </button>
        </form>
    )
}

export default SearchBox;