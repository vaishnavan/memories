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
                    <img width="100%" src="https://kacrm.datamaticsbpm.com/assets/img/user-img-icon.png" alt="no" />
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
