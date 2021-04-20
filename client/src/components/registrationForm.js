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

const Registration = ()=> {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isReg, setIsReg] = useState(false)
    const onSubmit = data => {
      axios.post(`/user/reg`,data)
      .then(res => { 
        alert(`Success: User has been created!`)
        setIsReg(true)
      })
      .catch(err=>{ alert(`Smth went wrong: ${err.response.data.mes}`)
    })
    }
    
    return (
  <div style={Wrapper}>
    <div style={{width:400}}>
       <h1 style={{textAlign:'center'}}>Registration</h1>
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

        <div>
          <label htmlFor="confirm_password" >Confirm password</label>
          <input className="field" type="password" name="password" {...register("confirm_password",{validate:(value)=> watch("password") === value })}/>
          {errors.confirm_password && <span style={{color:'red'}}>passwords don't match</span>}
        </div>
          
          <input className="Button" type="submit" value="Sign Up"/>
        </form>
        <span>if you already have account: <Link to="/">Sign In</Link> </span>
        {localStorage.getItem('isAuth') && <Redirect to="/user/budget" />}
        {isReg && <Redirect to="/" />}
        </div>
      </div>
    );
  }
  
  export default Registration;