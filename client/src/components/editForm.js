import React, {useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import {Link} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import './style/finance.css'
const EditFinance = (data)=> {
  const [spent, setSpent] = useState(data.entry.obj.spent)
  const [category, setCategory] = useState(data.entry.obj.category)
  const [newDate, setNewDate] = useState(new Date(data.entry.obj.date))

  const editSubmit = (e)=>{
    e.preventDefault();
    console.log("Edit")
    const config = {
      headers: {
          'auth-token':localStorage.usertoken
      }
    }
 const _id = data.entry.obj._id
 const dateStr = `${newDate.getFullYear()}-${("0"+(newDate.getMonth()+1)).slice(-2)}-${newDate.getDate()}`
    axios.post(`/user/finance/edit`,{spent, category, dateStr, _id}, config)
    .then(res => { alert(`Success: ${res.data}`) })
   .catch(()=>{ alert("Smth went wrong")})
  }


    
    return (
  <div>
      <form onSubmit={editSubmit}>
        
        <span><Link to="/user/budget">Back</Link></span>
    <div className="container">
            <div className="form-group">
        <DatePicker 
            selected={newDate} 
            onChange={date => setNewDate(date)} 
            dateFormat="yyyy-MM-dd"
            inline
            />
            </div>
          
        <div class="form-group">
        
        <label htmlFor="spent">Spent amount $$$</label>
        <input className="field" type="number" name="spent" defaultValue={spent} onChange={(e)=>{setSpent(e.target.value)}} />

        <label htmlFor="category">Category</label>
        <input className="field" type="text" name="category" defaultValue={category} onChange={(e)=>{setCategory(e.target.value)}}/>
          
        <input className="Button" type="submit" value="Edit"/>
        </div>
    </div>
      </form>
  </div>
    );
  }
  
  export default EditFinance;