import React, {useState, useEffect} from "react";
import {Redirect, useLocation } from "react-router-dom";
import EditFinance from './editForm'
import jwt from 'jwt-decode'
import Finance from './financeForm'
import NavBar from './navbar'

const Container = {
    display:'flex', 
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center'
}
const Budget = ()=> {
    const [username, setUserName] = useState()
    const location = useLocation()
    useEffect(()=>{
        if(localStorage.getItem('usertoken')){
        const {username} = jwt(localStorage.getItem('usertoken'))
        setUserName(username)
        }
    },[])
    return (
        <div>
             <NavBar/>
             <div style={{display:'flex', justifyContent:'flex-end',marginRight:150}}>
       <h1 style={{fontWeight:400, fontSize:42, color:'#2A2222'}}>{username}</h1>
       </div>
        <div style={Container}>
        {location.state && <EditFinance entry={location.state}/>}
        {!location.state && <Finance/>}
        {!localStorage.getItem('isAuth') && <Redirect to="/" />}
        </div>
        </div>
    );
  }
  
  export default Budget;