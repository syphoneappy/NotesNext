'use client'
import { motion } from 'framer-motion';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen  flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 bg-white "
      >
        <h1 className="text-4xl font-bold text-center mb-8">NoteKeeper Application</h1>
        <p className="text-lg text-gray-800 mb-8">
          NoteKeeper is a simple and intuitive application for keeping track of your notes, ideas, and reminders.
          Whether you,re jotting down quick thoughts or organizing your thoughts into categories, NoteKeeper
          provides the tools you need to stay organized and productive.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <Link href="/login">
 
              <motion.button
                className="border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-bold py-2 px-4 rounded-full flex items-center m-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaSignInAlt className="mr-2" />
                Log in to your account
              </motion.button>
     
          </Link>
          <Link href="/register">
  
              <motion.button
                className="border border-green-500 text-green-500 hover:text-white hover:bg-green-500 font-bold py-2 px-4 rounded-full flex items-center m-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaUserPlus className="mr-2" />
                Create a new account
              </motion.button>
   
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
