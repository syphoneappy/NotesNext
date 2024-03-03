'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaUser , FaEnvelope, FaLock, FaEye , FaTimesCircle , FaSpinner} from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

import Api from '../BaseApi';
import { useRouter } from 'next/navigation';
export default function Register() {
    const router = useRouter();
    const [form , setFormdata] = useState({
        email: "", 
        password: "",
        confirm_password: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm , setPasswordConfirm] = useState(false)
    const [message, setMessage] = useState({
        loggedIn:false,
        message:null
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        if (form.password !== form.confirm_password) {
            setMessage({
                loggedIn: false,
                message: "Passwords do not match"
              });
            setFormdata({
                ...form,
                confirm_password: "" // Clear confirm password field
            });
            return;
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(form.password)) {
            setMessage({
                loggedIn: false,
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
              });
       
            return;
        }

        Api.post("authuser/register/",form).then((response) => {
            setLoading(true)
            if (response.status === 201){
                setMessage({
                    loggedIn: true,
                    message: "Account created successfully. taking to the login page..."
                  });
                  setTimeout(() => {
                    router.push('/login');
                  }, 3000);
            }

        }).catch((error) => {
           if(error.response.status === 400){
            setMessage({
                loggedIn: false,
                message: "User Already exits"
              });
           }}).finally(
            setLoading(false)
           )
        

    };
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...form,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityConfirm = () => {
        setPasswordConfirm(!showPasswordConfirm)
    }

    const handleClose = () => {
        setMessage({
            loggedIn:false,
            message:null
        });
    };


    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-1"
            >
                <div className='h-full w-full bg-white px-8 pt-6 pb-6 mb-4'>
                    <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-8 pt-6 mb-4 w-full max-w-md rounded">
                            <div className="mb-4">
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <FaEnvelope className="text-gray-600 mr-2" />
                                        ),
                                    }}
                                    required
                                    value={form.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        startAdornment: (
                                            <FaLock className="text-gray-600 mr-2" />
                                        ),
                                        endAdornment: (
                                            <FaEye onClick={togglePasswordVisibility} className="text-gray-600 cursor-pointer" />
                                        )
                                    }}
                                    required
                                    value={form.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    id="confirm_password"
                                    name="confirm_password"
                                    label="Confirm Password"
                                    variant="outlined"
                                    fullWidth
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    InputProps={{
                                        startAdornment: (
                                            <FaLock className="text-gray-600 mr-2" />
                                        ),
                                        endAdornment: (
                                            <FaEye onClick={togglePasswordVisibilityConfirm} className="text-gray-600 cursor-pointer" />
                                        )
                                    }}
                                    required
                                    value={form.confirm_password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <p className="text-gray-600">Already a user? </p>
                                <Link href="/login" className="text-blue-500 hover:underline ml-1">
                                    Login
                                </Link>
                            </div>
                        </div>
                        {message.message !== null && (
          <div className={`flex items-center justify-between ${message.loggedIn ? 'bg-green-100' : 'bg-red-100'}  px-4 py-2 rounded-md mb-4`}>
            <p className={`${message.loggedIn ? 'text-green-500' : 'text-red-500'}  mr-2`}>{message.message}</p>
            <FaTimesCircle className={`${message.loggedIn ? 'text-green-500' : 'text-red-500'} cursor-pointer`} onClick={handleClose} />
          </div>
        )}
                        <div className="mb-6">
                        {loading ? (
                            <FaSpinner className="animate-spin h-5 w-5 mx-auto text-gray-500" />
                        ) : (
                            <motion.button
                                type="submit"
                                className="border rounded-full text-black hover:bg-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
                                style={{ border: "3px solid gray", borderRadius: "100px" }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaUser className="mr-2" />
                                Login
                            </motion.button>
                        )}
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
