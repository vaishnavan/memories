import React, { useEffect, useState } from 'react'
import Header from '../../components/Navbar/Header';
import { getPost } from '../../services/post.service';
import {AccessAlarm} from '@material-ui/icons'
import Loader from "react-loader-spinner";
import moment from 'moment';
import './showmemories.css';

export default function ShowMemories() {
    const [showData, setShowData] = useState([]);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(true)
        getPost().then((res) => {
            // console.log(res.data);
            setShowData(res.data);
            setShow(false)
        })
    }, [])

    return (
        <div>
            <Header />
            {show ? 
            <div className="loader">
                <Loader
                    type="Grid"
                    color="#400CCC"
                    height={50}
                    width={50}
                    // timeout={3000} //3 secs
                />
            </div>
            :
            <div className="show-main" style={{marginTop:"80px"}}>
            {showData.sort((a,b) => a._id < b._id ? 1:-1).map((data) => {
                return(
                    <div className="show-card" key={data._id}>
                        <div className="card-title">
                            <h3>{data.title}</h3>
                        </div>
                        <div className="card-img">
                            <img src={data.photo} alt="no" />
                        </div>
                        <div className="card-desc">
                            <div className="card-username">
                                <h3>{data.postedBy.username} :</h3>
                            </div>
                            <div className="card-para">
                                <p style={{marginLeft:"10px"}}>{data.desc}</p>
                            </div>
                        </div>
                        <div className="card-postdate">
                            <div><AccessAlarm /> </div>
                            <div style={{marginLeft:"10px"}}>{moment(data.createdAt).format("lll")}</div>
                        </div>
                    </div>
                )
            })}
            </div>
          }
        </div>
    )
}
