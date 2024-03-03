'use client'
import Api from '@/app/BaseApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSpinner , FaArrowLeft } from 'react-icons/fa';
import Cookies from 'js-cookie';
import Link from 'next/link';

const NotePage = () => {
    const router = useRouter();

    const [data, setData] = useState({ title: '', content: '' });


    const handleSave = () => {
        Api.post('app/notes/', data, {
            headers: {
                "Authorization": `Bearer  ${Cookies.get("access_token")}`
            }
        }).then(() => router.push('/notes'));
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-4">
                    <Link href="/notes" className="text-blue-500 hover:underline flex items-center">
                        <FaArrowLeft className="mr-1" />
                        Back to Notes
                    </Link>
                </div>
            </div>
     
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Note Details</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="title"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            id="description"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            rows="15"
                            value={data.content}
                            onChange={(e) => setData({ ...data, content: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="mt-8">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
 
        </div>
    );
};

export default NotePage;
