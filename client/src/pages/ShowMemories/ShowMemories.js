import React, { useEffect, useState } from 'react'
import Header from '../../components/Navbar/Header';
import { getPost } from '../../services/post.service'

export default function ShowMemories() {
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        getPost().then((res) => {
            // console.log(res.data);
            setShowData(res.data);
        })
    })

    return (
        <div>
            <Header />
            {showData.map((data) => {
                return(
                    <div key={data._id}>
                        <h4>{data.title}</h4>
                        <h4>{data.desc}</h4>
                        <img width="200" height="150" src={data.photo} alt="no" />
                        <h3>{}</h3>
                        {/* <h2>helo</h2>
                        <h1>{data.title}hello</h1>
                        <h4>{data.desc}</h4> */}
                    </div>
                )
            })}
        </div>
    )
}
