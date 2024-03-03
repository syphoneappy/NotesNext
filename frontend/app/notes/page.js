'use client'

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt , FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { FaSpinner , FaEnvelope } from 'react-icons/fa';
import Api from '../BaseApi';
import Link from 'next/link';
const Page = () => {
    const router = useRouter();
    const [loading , setLoading] = useState(true);
    const [email, setEmail] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        
        const token = Cookies.get('access_token')
     
        Api.get("authuser/check_usr/", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
         
            setEmail(response.data.email)
        }).catch((error) => {
            alert("There is problem processing request from the backend!")
            router.push("/")
        })

    },[router])

    const  handleLogout = () =>{
        
        
    }
    

    useEffect(() => {
        Api.get("app/notes/",{
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => setData(response.data)).catch(err=>console.log(err)).finally(setLoading(false))
    },[])
        
    
    const handleClick = (item) => {
        router.push(`/notes/note/${item.id}`);
    };
    return (
        <div>
            
          {loading ? (
             <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-50">
             <FaSpinner className="animate-spin text-6xl text-gray-500" />
           </div>
          ) : (
            <>
             <div className="fixed top-0 left-0 w-full py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white text-center">
    <div className="flex items-center justify-center">
      <FaEnvelope className="text-3xl mr-2" />
      <p className="text-lg font-semibold">{email}</p>
    </div>
  </div>

      
  <button
            className="fixed z-50 top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
            onClick={() => {
              Cookies.remove('access_token')
              router.replace('/');
            }}
        >
            <FaSignOutAlt className="mr-2" />
            Logout
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-20 ml-2 mr-2">

        <Link href="/notes/note">
  <div className="w-400 h-400 border border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:cursor-pointer">
    <FaPlus className="text-gray-500 text-4xl mb-4" />
    <h2 className="text-gray-700 text-lg font-semibold">Add Notes</h2>
  </div>
</Link>
      {data.map((item) => (
    
        <div className="w-400 h-400 bg-gray-200 p-4 rounded-lg hover:cursor-pointer" key={item.id} onClick={() => handleClick(item)}>
           <p className='text-lg flex justify-center align-items'>
            {item.title.split(' ').slice(0, 20).join(' ')}
            {item.title.split(' ').length > 20 ? '...' : ''}
            </p>
        </div>
      
      ))}
    </div>
            </>

          )}
            
    
       
        </div>
    );
};

export default Page;
