import React from 'react'
import Header from './Header'


const Profile = () => {
    return (
        <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
            <Header />
            <div className="w-full flex flex-col align-items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
                <h1 className='flex align-items-center justify-center'>Profile</h1>
            </div>
        </main>
    )
}

export default Profile