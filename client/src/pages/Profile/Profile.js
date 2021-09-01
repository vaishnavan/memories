import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Navbar/Header';
import { myContext } from '../../context'
import {useHistory} from 'react-router-dom';
import "./profile.css";

export default function Profile() {
    const [userDisplay, setUserDisplay] = useState({});
    const {userLocData} = useContext(myContext);
    console.log(userLocData);
    

    useEffect(() => {
        const {user} = userLocData;
        setUserDisplay(user);
    }, [userLocData])

    let history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        window.location.reload();
        history.push("/signin")
    }

    return (
        <div>
            <Header />
            <div className="profile-Card-main">
                <div className="profile-image">
                    <img src="https://lh3.googleusercontent.com/proxy/5yjFJQR-GxtSumhWRp2djTZTRywe4cT4FWPfp-jkldf8X3I2lUwOMs87XcPB2XsBKVLop_4dNjIP77yhH8QZBd4fVfBE3RfL47dMjYajEJb-_WnjxucYdxzxeaXIB5C80Ia2eAjDm8yH8HJA_J-EhcZ3wNDeCViA5DsktA" alt="no" />
                </div>
                <hr />
                <div className="profile-table">
                   <h4>{userDisplay.username}</h4>
                   <h4>{userDisplay.email}</h4>
                   <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}
