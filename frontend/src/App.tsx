import React, {useEffect} from 'react';
import './App.module.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {CustomerPage} from './components/Customer/CustomerPage'
import appStyles from './App.module.css'
import {CustomerDetails} from "./components/Customer/customerTile/customerDetails/CustomerDetails";

function App() {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/customers")
    },[])

  return (
      <div className={appStyles.app}>
          <Routes>
              <Route path="/customers" element={<CustomerPage/>}/>
              <Route path="/" element={<CustomerPage/>}/>
          </Routes>
      </div>
  );
}

export default App;
