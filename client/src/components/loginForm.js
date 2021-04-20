import React, {useState} from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useForm} from "react-hook-form";
import './style/finance.css'
const Wrapper = {
  display:'flex',
  justifyContent:'center',
  paddingTop:100,
  width:'100%',
}
const Login = ()=> {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isAuth, setIsAuth] = useState()
 
    const onSubmit = data => {
      axios.post(`/user/signIn`,data)
      .then(res => { alert(`Auth seccess!`)
        localStorage.setItem('usertoken', res.data);
        localStorage.setItem('isAuth', true);
        setIsAuth(true)
    })
      .catch((err)=>{ alert(`Smth went wrong: ${err.response.data.mes}`)})
    }
    
    return (
  <div style={Wrapper}>
    <div style={{width:400}}>
      <h1 style={{textAlign:'center'}}>Please sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div>
            <label htmlFor="username">Username</label>
          <input className="field" type="text" name="username" {...register("username", {required:true}) }/>
          {errors.username && <span style={{color:'red'}}>This field is required</span>}
        </div>
    
        <div>
          <label htmlFor="email">Email</label>
          <input className="field" name="email"  {...register("email", {required:true})}/>
          {errors.email && <span style={{color:'red'}}>This field is required</span>}
        </div>
    
        <div>
        <label htmlFor="password" >Password</label>
          <input className="field" type="password" name="password" {...register("password",{
            required:{
              value:true, 
              message:'This field is required'}, 
          minLength:{
            value:4,
           message:'min length 4 symbols'}})}/>
          {errors.password && <span style={{color:'red'}}>{errors.password.message}</span>}
        </div>
          
          <button className="Button"> Sign In </button>
        </form>
        <span>if you don't have account: <Link to="/reg">Registration</Link> </span>
        {(localStorage.getItem('isAuth') || isAuth) && <Redirect to="/user/budget" />}
  </div>
</div>
    );
  }
  
  export default Login;