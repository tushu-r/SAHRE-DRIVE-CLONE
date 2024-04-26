import React from 'react' ;
import "./App.css" ;
import Image from "./image2.png";
import { Apps, FormatAlignCenter, HelpOutlineOutlined, HelpOutlineRounded, Search, Settings } from "@mui/icons-material";
import { Avatar } from "@mui/material";


const Header = () => {
  return (
   <>
   <div className="header">
   <div className="header_logo">
            <img alt="Google Drive"
            style={{
                objectFit:"contain",
                width:"100px",
                height:"70px",
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBw_qJm8Jo96TWiKglLdtK5m7vXnAr8Gz7Eg&usqp=CAU" />
   </div>
   <div className="header_icons">
        <span>
         <HelpOutlineOutlined />
         <Settings />
        </span>
        <span>
         <Apps />
        </span>
    </div>
    </div>
   </>
  )
}

export default Header
