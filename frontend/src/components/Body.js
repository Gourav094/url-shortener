import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import API_URL from './constant'

function Body() {
    const [urlData, setUrlData] = useState([])
    const [input, setInput] = useState()
    const [shortId, setShortId] = useState()
    const [originalUrl, setOriginalUrl] = useState()
    const [analytics, setAnalytics] = useState()


    useEffect(() => {
        const fetchData = async () => {
            const fetchShortUrl = fetch(`${API_URL}/url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "url": originalUrl,
                })
            })
                .then(response => response.json())
                .then(jsonData => setShortId(jsonData.id));

            const fetchUrlsData = fetch(`${API_URL}`)
                .then(response => response.json())
                .then(jsonData => setUrlData(jsonData));

            await Promise.all([fetchShortUrl, fetchUrlsData]);
        };

        if (originalUrl) {
            fetchData();
        }
    }, [originalUrl]);

    useEffect(() => {
        const fetchUrlsData = async () => {
            const data = await fetch(`${API_URL}`)
            const json = await data.json()
            setUrlData(json)
        }
        fetchUrlsData()
    }, [])

    function handleClick(e) {
        e.preventDefault()
        setOriginalUrl(input)
    }
    function handleCopyClipboard(){
        navigator.clipboard.writeText(API_URL+shortId)
        toast.success('copied to clipboard')
    }

    return (
        <div className='bg-slate-800 min-h-screen pt-12 px-16'>
            <Toaster />
            <div className='text-white'>
                <span className='text-2xl px-1 rounded bg-gradient-to-br from-purple-600 to-blue-500'>Super URL</span>
                <p className='pt-2 text-gray-200'>Let's shorten your looooong URL :)</p>
            </div>
            <form className='py-5 border-b border-gray-400'>
                <input className='py-2 px-4 outline-none rounded-lg mr-4 min-w-[40%]' type='text' placeholder='Enter original URL' onChange={(e) => setInput(e.target.value)} />
                <button className='py-2 px-4 bg-green-600 text-white rounded-lg cursor-pointer hover:opacity-90' onClick={handleClick}>Shorten</button>
                {shortId && <div className='flex gap-4 text-white items-center'>
                    <p className='pt-4 ml-2  text-lg'>{`${API_URL}/${shortId}`}</p>
                    <i className="fa-regular fa-clipboard pt-4 hover:text-blue-400 cursor-pointer" onClick={handleCopyClipboard}></i>
                </div>}
            </form>
            <div className='py-4 text-gray-200'>
                <table className='table-fixed w-full'>
                    <thead>
                        <tr>
                            <th className='text-start' style={{ width: '80%' }}>Original Url</th>
                            <th className='text-start' style={{ width: '40%' }}>Short Url</th>
                            <th className='text-start' style={{ width: '20%' }}>Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            urlData?.data && urlData?.data.map((url, index) => (
                                <tr key={index}>
                                    <td>{url.redirectUrl}</td>
                                    <td>{`${API_URL}/${url.shortId}`}</td>
                                    <td>{url.visitHistory.length}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Body
