import  React  from "react" ;
import "./index.css"
import  Header from "./Header";
import SideBar from "./SideBar";
import Data from "./Data"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Image from "./Image.png" ;
function App() {
   const signIn = () =>{
     window.location.href="/Drive" ;
   }

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/Drive" element={
                <div>
                <Header  />
                <div className="App">
                <SideBar />
                <Data />
                </div>
               
               </div>
              } />
              <Route path="/" element={
                <div   id="div">
                <img src="data:image/jpeg;base64,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"/>
                <button
               onClick={signIn}
                id="button"
                >
                <span class="material-symbols-outlined">
                      login
                  </span>
                </button>
                
            </div>
              } />
          </Routes>
      </BrowserRouter>
    
  </div>


   
  );
}

export default App;
