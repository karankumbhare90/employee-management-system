import React from 'react'
import SubNavbar from './shared/SubNavbar'

const Home = () => {
    return (
        <div className='h-full w-full flex flex-col'>
            <SubNavbar />

            <div className='mx-auto my-auto text-3xl font-semibold'>
                Welcome Admin Panel
            </div>
        </div>
    )
}

export default Home