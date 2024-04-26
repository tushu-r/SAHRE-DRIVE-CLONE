import { ArrowDownward, ArrowDropDown, InfoOutlined , InsertDriveFile, List} from '@mui/icons-material'
import React , {useEffect ,useState} from 'react'
import "./data.css" ;
import { db } from './firebase';
import Modal from '@mui/material/Modal';
import copy from "copy-to-clipboard";


const Data = () => {
    const [files,setFiles] = useState([]) ;
    const [open, setOpen] = useState(false) ;

    useEffect(()=>{
        db.collection("DRIVE").onSnapshot(snapshot =>{
            setFiles( snapshot.docs.map((doc =>({
                id:doc.id,
                data:doc.data() 
            }))))
        })
    },[])


    const handleClose = ()=>{
        setOpen(false) ;
      }
      const handleOpen = ()=>{
        setOpen(true) ;
      }

    function FormatBytes(bytes,decimals =2 ){
        if(bytes === 0 ) return '0 Bytes' ;
        const k = 1024 ;
        const dm =decimals < 0 ? 0 :decimals ;
        const sizes = ['Bytes','KB','MB','GB','TB'];
        const i = Math.floor(Math.log(bytes)/Math.log(k) ) ;
        return parseFloat((bytes/Math.pow(k,i)).toFixed(dm) + ' ' + sizes[i] );
    }




  return (
    <div className='data'>
    <Modal open={open} onClose={handleClose} >
          <div className='modal_pop'>
              <form>  
                  <div className='modalBody'>
                      <label for="input_tag" className='input_label'>
                     <span id="text_block" >
                         <span class="material-symbols-outlined" style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
                           draft
                         </span><br/>
                         <span id="text" style={{fontWeight:"bold",fontSize:"18px"}}>
                           Copied To ClipBoard
                         </span>
                     </span>
                      </label>
                  </div>
              </form> 
          </div>
    </Modal>

        <div className='data_content'> 
        <div className='data_list'>
            <div className='detailsRow'>
                <p><b>Name <ArrowDownward /></b></p>
                <p><b>Last Modified </b></p>
                <p><b>File Size </b></p>
                <p><b><span class="material-symbols-outlined">
                share
                </span></b></p>
        </div>
            <div className='content'>
           
            {
                files.map((file)=>{
                    var x = file?.data?.fileURL ;
                    return (
                        <div className='details_Row'>
                        <p id="p1"> 
                            <a href={file.data.fileURL} id="link">
                            <InsertDriveFile />   {file.data.fileName}
                            </a>                        
                        </p>
                        <p id="time">{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                        <p id="size">{ FormatBytes(file.data.size) + ' '+'MB'}</p>
                        <p>
                            <b>
                                     <span 
                                        onClick={(file)=>{
                                            setOpen(true);
                                            copy(x);
                                        }}
                                        class="material-symbols-outlined">
                                        link
                                        </span>
                      
                            </b>
                        </p>
                        </div>
                    )
                })
            }
            </div>
         </div>
        </div>
     
    </div>
  )
}

export default Data ;
