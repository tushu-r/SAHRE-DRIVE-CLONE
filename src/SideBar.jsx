import React, { useState } from 'react'
import "./App.css";
import { LogoutSharp, MobileScreenShareSharp } from '@mui/icons-material';

import Modal from '@mui/material/Modal';

import {db, storage} from "./firebase";
import firebase from "firebase";
import { lightBlue } from '@mui/material/colors';


const SideBar = () => {
  const [open, setOpen] = useState(false) ;
  const [uploading,setUploading] = useState(false);
  const [file,setFile] = useState(null) ;
  const [click,setClick] = useState(false) ;
  const [uploaded,setuploaded] = useState(false) ;
  const handleClose = ()=>{
    setOpen(false) ;
  }
  const handleOpen = ()=>{
    setOpen(true) ;
  }

  const handleChange = (e) =>{
    if(e.target.files[0]) {
      setClick(true);
        setFile(e.target.files[0]) ;
    }
  }

  const handleUpload =  (event) =>{
    if(click) {
       event.preventDefault() ;
      setUploading(true);
       storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
        
        storage.ref("files").child(file.name).getDownloadURL().then(url =>{
            db.collection("DRIVE").add({
              fileName:file.name,
              fileURL:url,
              size:snapshot._delegate.bytesTransferred,
              timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
        })

        console.log(snapshot) ;
        setUploading(false);
        setFile(null);
        setuploaded(true) ;
        setTimeout( ()=> {
          setOpen(false) ;
          setuploaded(false) ;
        } , 3000 );
    })
  }
}

const openModal = ()=>{
  setOpen(true) ;
}

  return (
    <>
    <Modal open={open} onClose={handleClose} >
          <div className='modal_pop'>
              <form>  
                  <div className='modalBody'>

                  {
                     uploading  ? (<div className="lds-dual-ring"></div>) : 
                     (
                      <>
                      {
                        uploaded ? (<span class="material-symbols-outlined">
                        file_download_done
                        </span>) : ( 
                          <>
                      <label for="input_tag" className='input_label'>
                      <span class="material-symbols-outlined"id="icon">
                        cloud_upload
                        </span>
                        <span id="text_block" style={{display:'none'}}>
                         <span class="material-symbols-outlined" style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
                           draft
                         </span><br/>
                         <span id="text" style={{fontWeight:"bold",fontSize:"18px"}}></span>
                        </span>
                      <input onInput={(e)=>{
                        document.getElementById("icon").style="display:none;" ;
                        document.getElementById("text_block").style="display:inline-flex;flex-direction:column;justify-content:center;align-content:center;";
                        document.getElementById("text").innerText= e.target.files[0].name ;
                      }} style={{display:"none"}} onChange={handleChange} type="file" id="input_tag" className='post_file'/>
                      
                      </label>
                      <label for="submit" >
                      <span class="material-symbols-outlined" id="publish_icon">
                        publish
                        </span>
                        <input style={{display:"none"}} onClick={handleUpload} type="submit" id="submit" className='post_submit' />
                      </label>
                     
                      </>
                      
                     )}
                     </>
                    
                     )
                    
                  }
                   
                  </div>
              </form> 
          </div>
    </Modal>

    <div className='sidebar'>
      <div className='sidebar_btn'>
          <button onClick={openModal}>
              <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" />
              <span>New</span>
          </button>
      </div>
      <div className='sidebar_options'>
            <div className='sidebar_option'
            id="sidebar_1"
            >
              <MobileScreenShareSharp />
              <span>My Files</span>
            </div>
            <div className='sidebar_option'>
            <a href="/" style={{
              textDecoration:"none"
              ,display:"flex",
              alignContent:"center",
              
            }}>
            <LogoutSharp />
            <span>Logout</span>
            </a>
            <hr/>
      </div>
      </div>
    </div>
    </>
   
  )
}

export default SideBar
