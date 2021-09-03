import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Navbar/Header';
import { getLike, getPost, getUnlike } from '../../services/post.service';
import {AccessAlarm} from '@material-ui/icons'
import Loader from "react-loader-spinner";
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './showmemories.css';
import { myContext } from '../../context';

export default function ShowMemories() {
    const [showData, setShowData] = useState([]);
    const [show, setShow] = useState(true);

    const {userLocData} = useContext(myContext);
    console.log(userLocData);

    useEffect(() => {
        handleGetPost();
    }, [])

    const handleGetPost = () => {
        getPost().then((res) => {
            // console.log(res.data);
            setShowData(res.data);
            setShow(false)
        })
    }

    const likeData = (id) => {
        const postData = {
            postId:id
        }
        getLike(postData)
        .then((res) => {
            // setShow(true)
            const newData = showData.map(item => {
                if(item._id === res._id){
                    return res
                }else{
                    return item
                }
            })
            handleGetPost();
            setShowData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const unlikeData = (id) => {
        const postData = {
            postId:id
        }
        getUnlike(postData)
        .then((res) => {
            // setShow(true)
            const newData = showData.map(item => {
                if(item._id === res._id){
                    return res
                }else{
                    return item
                }
            })
            handleGetPost();
            setShowData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

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
            <>
            <div className="show-result-count" style={{marginTop:"80px",marginLeft:"10px"}}>
                <h3>Post Count: {showData.length}</h3>
            </div>
            <div className="show-main">
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
                        <div className="card-postdatemain">
                            <div className="card-postdate">
                                <div><AccessAlarm /> </div>
                                <div style={{marginLeft:"10px"}}>{moment(data.createdAt).format("lll")}</div>
                            </div>
                            <div>
                                {data.likes.includes(userLocData.user._id) ?
                                <>
                                    <FavoriteIcon style={{ fill: 'red' }}  onClick={()=> unlikeData(data._id)} />
                                    <span className="mt-2">{data.likes.length}</span>
                                </>
                                :
                                <>
                                  <FavoriteBorderIcon onClick={() => likeData(data._id)} />
                                  <span className="mt-2">{data.likes.length}</span>
                                </>
                                
                                }
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            </>
          }
        </div>
    )
}
