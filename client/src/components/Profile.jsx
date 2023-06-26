import React from 'react'
import Header from './Header'
import { Avatar } from "../assests";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.user);
    return (
        <main className="w-screen min-h-screen flex items-center justify-center flex-col bg-primary">
            <Header />
            <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
                <h1 className="w-full flex items-center justify-center font-extrabold px-6 md:px-24 2xl:px-96 gap-12 mb-4 text-4xl">My Profile</h1>
                <div className="border-4 border-[#0288d1] rounded-3xl p-8 w-fit flex flex-col items-center justify-center">
                    <div className="cursor-pointer flex items-center justify-center">
                        <motion.img
                            className="object-cover"
                            src={user?.picture ? user?.picture : Avatar}
                            whileHover={{ scale: 1.15 }}
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <p className="text-3xl text-headingColor text-center mt-4 mb-3">
                        {user?.name && (
                            <span>{`Name: ${user?.name}`}</span>
                        )}
                    </p>
                    <p className="text-3xl text-headingColor text-center">
                        {`Email: ${user?.email}`}
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Profile