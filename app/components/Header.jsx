import Link from 'next/link';
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import SearchBox from './SearchBox';



function Header() {
    const [activeTab, setActiveTab] = useState('All');

    // Function to handle tab click
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        localStorage.setItem("activeTab", `"${tabName}"`)
    };

    return (
        <div className="w-full h-full mt-10 gap-5">
            <SearchBox />
            <div className="grid grid-cols-1 align-bottom items-center mt-5 content-between">
                <div className='w-full'>
                    <Link href={'/add'}><button className="btn w-full"><h1>Add Task</h1><IoMdAdd className='ml-4' size={20} /></button></Link>
                </div>
                <div className='mt-6 max-w-fit'>

                    <div className=" h-[35px] flex gap-x-5">
                        <button className={`btn w-fit text-md ${activeTab === 'All' ? ' btn-active font-bold' : 'font-normal'} px-5`} onClick={() => handleTabClick('All')}>All</button>
                        <button className={`btn w-fit text-md ${activeTab === 'Uncompleted' ? 'btn-active font-bold' : 'font-normal'} px-3`} onClick={() => handleTabClick('Uncompleted')}> Uncompleted</button>
                        <button className={`btn w-fit text-md ${activeTab === 'Completed' ? ' btn-active  font-bold' : 'font-normal'} px-3`} onClick={() => handleTabClick('Completed')}> Completed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header