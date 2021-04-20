import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import './style/navbar.css'
const NavBar = ()=> {
  const [isAuth, SetIsAuth] = useState(true)
 
    const exit = ()=>{
      localStorage.clear()
      SetIsAuth(false)
    } 
    return (
    <div className="Title">
      <div style={{display:'flex', justifyContent:'space-between',width:'100%', marginRight:100}}>
        <div><h2 style={{color:'#E3E3E3',fontWeight:600}}>Budget tracker</h2></div>
      {isAuth && <Link to="/" style={{textDecoration:'none',fontSize:32, fontWeight:400, color:'#E3E3E3'}} onClick={()=>{exit()}}>Exit</Link>}
      </div>
      {isAuth || <Redirect to="/"/>}
    </div>
  
    );
}
  export default NavBar;