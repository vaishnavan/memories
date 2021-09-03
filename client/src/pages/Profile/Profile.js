import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Navbar/Header';
import { myContext } from '../../context'
import {useHistory} from 'react-router-dom';
import "./profile.css";
import { getMypost } from '../../services/post.service';
import {AccessAlarm} from '@material-ui/icons';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import moment from 'moment';

export default function Profile() {
    const [userDisplay, setUserDisplay] = useState({});
    const {userLocData} = useContext(myContext);
    const [profilData, setProfileData] = useState([])
    // console.log(userLocData);
    

    useEffect(() => {
        const {user} = userLocData;
        setUserDisplay(user);
        getMypost()
        .then((res) => {
            // console.log(res.data);
            setProfileData(res.data.mypost)
        })
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
            <div className="show-main" style={{marginTop:"80px"}}>
                {profilData.sort((a,b) => a._id < b._id ? 1:-1).map((data) => {
                    return(
                        <div className="show-card" key={data._id}>
                            <div className="card-profile-title">
                                <div>
                                    <img src="https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-15.jpg" alt="profile" />
                                </div>
                                <div>
                                    <h3 style={{marginLeft:"10px", textTransform:"capitalize"}}>{data.postedBy.username}</h3>
                                </div>
                            </div>
                            <div className="card-img">
                                <img src={data.photo} alt="no" />
                            </div>
                            <div className="card-desc">
                                <FavoriteBorderIcon />
                                <span style={{marginLeft:"3px"}}>{data.likes.length}</span>
                            </div>
                            <div className="card-postdatemain">
                                <div className="card-postdate">
                                    <div><AccessAlarm /> </div>
                                    <div style={{marginLeft:"10px"}}>{moment(data.createdAt).format("lll")}</div>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
        </div>
    )
}
