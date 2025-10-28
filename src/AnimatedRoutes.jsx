import React from 'react'
import { Routes, Route } from 'react-router-dom'

import SignUp from "./views/SignUp";
  import Login from "./views/Login";
  import Dashboard from "./views/Dashboard";
  import Deposits from "./component/footer/Deposits";
  import History from "./component/footer/History";
  import Profile from "./views/Profile";
  import Notification from "./component/Notification";
  import Admin from './views/Admin';
  import { AnimatePresence, motion } from "framer-motion";
  import { useLocation } from "react-router-dom";
 
const AnimatedRoutes = () => {
    const location = useLocation()
  return (
   
         <div className="relative w-full min-h-screen overflow-x-hidden"> 
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full min-h-screen overflow-x-hidden"
        >
          <Routes location={location}>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/deposits" element={<Deposits />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/admin" element={<Admin />} />

          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
 
  )
}

export default AnimatedRoutes