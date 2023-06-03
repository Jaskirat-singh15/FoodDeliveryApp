import React from 'react';
import {
    FaArrowLeft,
  } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { Bill } from "../assests";
import { Header } from "../components";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";

const CheckOutSuccess = () => {
  return (
    <main className="w-screen min-h-screen fex items-center justify-start flex-col">
        <Header/>
        <div className="w-full flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-9">
            <img src={Bill} className="w-full md:w-656" alt="" />
            <h1 className="text-[50px] text-headingColor font-bold">
                AMOUNT_PAID_SUCCESS
            </h1 >
            <motion.div {...buttonClick}>
                <NavLink
                    to={"/"}
                    className="flex items-center justify-center gap-4 cursor-pointer text-2l text-textColor"
                >
                    <FaArrowLeft className="text-3xl text-textColor"/>GO_BACK_TO_HOME
                </NavLink>
            </motion.div>
        </div>
    </main>
  )
}

export default CheckOutSuccess