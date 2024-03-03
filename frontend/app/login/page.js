'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock , FaTimesCircle , FaSpinner } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Api from '../BaseApi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Api.post('/authuser/login/', formData).then((response) => {
            console.log(response);
            const access  = response.data.tokens.access;
            console.log(access);
            Cookies.set('access_token', access, {expires: 1});

            router.push('/notes');
        }).catch((error) => {
        setMessage("Something went wrong while processing the request on server side! or this account does not exits!", error)
        }).finally(setLoading(false))
        console.log(formData);
    };

    const handleClose = () => {
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md w-full rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-1"
            >
                <div className='h-full w-full bg-white px-8 pt-6 pb-6 mb-4'>
                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    InputProps={{
                                        startAdornment: (
                                            <FaLock className="text-gray-600 mr-2" />
                                        ),
                                    }}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <p className="text-gray-600">New user? </p>
                                <Link href="/register" className="text-blue-500 hover:underline ml-1">
                                    Register
                                </Link>
                            </div>
                        </div>
                        {message !== "" && (
          <div className={`flex items-center justify-between bg-red-100  px-4 py-2 rounded-md mb-4`}>
            <p className={`text-red-500  mr-2`}>{message}</p>
            <FaTimesCircle className={`text-red-500 cursor-pointer`} onClick={handleClose} />
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
