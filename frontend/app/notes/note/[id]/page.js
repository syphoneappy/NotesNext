'use client'

import Api from '@/app/BaseApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSpinner , FaEdit, FaSave, FaTimes , FaTrash , FaArrowLeft} from 'react-icons/fa';
import Cookies from 'js-cookie';
import Link from 'next/link';

const NotePage = ({ params }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ title: '', content: '' });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        Api.get('app/notes/' + params.id, {
            headers: {
                "Authorization": `Bearer  ${Cookies.get("access_token")}`
            }
        })
            .then((response) => setData(response.data))
            .finally(() => setLoading(false));
    }, [params.id]);

    const { title, content } = data;

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleUpdate = () => {
        
        Api.put(`app/notes/${params.id}/`, data,{
            headers:{
                "Content-Type":"application/json",
                "Authorization" :`Bearer ${Cookies.get('access_token')}`
                }
            }
        )

        setEditMode(false); 
    };

    const handleDelete = () => {
        Api.delete(`app/notes/${params.id}/`,{
            headers:{
                "Authorization" :`Bearer ${Cookies.get('access_token')}`
            }
        }).then(router.push('/notes')).catch(err => console.error(err));
    }
    return (
        <div>
                        <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-4">
                    <Link href="/notes" className="text-blue-500 hover:underline flex items-center">
       
                            <FaArrowLeft className="mr-1" />
                            Back to Notes
                  
                    </Link>
                </div>
                {/* Other content */}
            </div>
            {loading ? (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-50">
                    <FaSpinner className="animate-spin text-6xl text-gray-500" />
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Note Details</h1>
                    <div className="mb-4">
                        {editMode ? (
                            <input
                                type="text"
                                id="title"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={title}
                                onChange={(e) => setData({ ...data , title: e.target.value })}
                            />
                        ) : (
                            <strong className='text-xl '>{title}</strong>
                        )}
                    </div>
                    <div className="mb-4">
                        {editMode ? (
                            <textarea
                                id="description"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                rows="15"
                                value={content}
                                onChange={(e) => setData({ ...data , content: e.target.value })}
                            ></textarea>
                        ) : (
                            <p>{content}</p>
                        )}
                    </div>
                    
                    <div className="mt-8">
                    <div className="fixed bottom-4 right-4">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center focus:outline-none focus:ring focus:ring-red-300"
                    onClick={()=> handleDelete()}
                >
                    <FaTrash className="mr-1" />
                    Delete
                </button>
            </div>
                        {editMode ? (
                            <>
                           <button
                            className="border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 mr-2"
                            onClick={handleUpdate}
                        >
                            <FaSave className="mr-1" />
                            Update
                        </button>
                            <button
                            className="border border-gray-500 text-gray-500 hover:text-white hover:bg-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300"
                            onClick={() => setEditMode(false)}
                        >
                            <FaTimes className="mr-1" />
                            Cancel
                        </button>
              
                            </>
        
                        ) : (
                            <button
                            className="border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            onClick={handleEditClick}
                        >
                            <FaEdit className="mr-1" />
                            Edit
                        </button>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default NotePage;
