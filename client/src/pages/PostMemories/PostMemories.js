import React, { useState } from 'react'
import Header from '../../components/Navbar/Header';
import { postUpload } from '../../services/post.service';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './postmemories.css';

const initialstate = {
    title:'',
    desc:'',
}

export default function PostMemories() {
    const [postDetail, setPostDetail] = useState(initialstate);
    const [singleFile, setSingleFile] = useState("");
    const [show, setShow] = useState(false)

    let history = useHistory();

    const handleFile = (e) => {
        setSingleFile(e.target.files[0]);
    }

    const handleChange = (e) => {
        setPostDetail({
            ...postDetail,
            [e.target.name]:e.target.value
        })
    }

    const uploadfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const {title, desc} = postDetail;
        formData.append('image', singleFile)
        formData.append('title', title)
        formData.append('desc', desc)   

        if(!title || !desc || !singleFile){
            alert("Please fill out below fields");
        }else{
            setShow(true)
            postUpload(formData).then((res) => {
                // console.log(res);
                history.push("/")
            })
        }
    }



    return (
        <div style={{marginTop:"80px"}}>
            <Header />
            <div className="postform">
                <div className="post-heading">
                    <h3>Memories Form</h3>
                </div>
                <form autoComplete="off">
                    <div className="post-input">
                        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
                    </div>
                    <div className="post-input">
                        <input type="text" name="desc" placeholder="Description" onChange={handleChange} />
                    </div>
                    <div className="post-input">
                        <input type="file" name="image"  onChange={handleFile} /><br /><br />
                    </div>
                    <div className="post-input">
                        <Button disabled={show} variant="contained" color="primary" onClick={uploadfile}>Upload</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
