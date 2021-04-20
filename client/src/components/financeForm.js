import React, {useState, useEffect} from "react";
import axios from "axios";
import FinanceTable from './financeTable'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style/finance.css'
const Finance = (data)=> {
const [date, setDate] = useState(new Date())
  const [spent, setSpent] = useState()
  const [category, setCategory] = useState()
  const [finances, setFinances] = useState([])
  const [refresh, setRefresh] = useState(false)

useEffect(()=>{
    const config = {
        headers: {
            'auth-token':localStorage.usertoken
        }
      }
      const dateStr = `${date.getFullYear()}-${("0"+(date.getMonth()+1)).slice(-2)}-${date.getDate()}`
    axios.post(`/user/finance/get`,{dateStr}, config)
    .then(res => { 
        setFinances([...res.data])
})
   .catch(()=>{ alert("Smth went wrong")})
  
},[refresh, date])

    const onSubmit = (e) => {
      e.preventDefault();
      const config = {
        headers: {
            'auth-token':localStorage.usertoken
        }
      }
      const dateStr = `${date.getFullYear()}-${("0"+(date.getMonth()+1)).slice(-2)}-${date.getDate()}`

      axios.post(`/user/finance/create`,{spent, category, dateStr}, config)
      .then(res => { setRefresh(!refresh)})
      .catch(()=>{ alert("Smth went wrong")})

    }


    
    return (
  <div>
      <form onSubmit={onSubmit}>
    <div className="container">
            <div className="form-group">
        <DatePicker 
            selected={date} 
            onChange={date => setDate(date)} 
            dateFormat="yyyy-MM-dd"
            inline
            />
            </div>
        <div class="form-group">
        <label htmlFor="spent">Spent amount $$$</label>
        <input className="field" type="number" name="spent" value={data.spent} onChange={(e)=>{setSpent(e.target.value)}} />

        <label htmlFor="category">Category</label>
        <input className="field" type="text" name="category" value={data.category} onChange={(e)=>{setCategory(e.target.value)}}/>
         <input className="Button" type="submit" value="Add"/>
        </div>
    </div>
      </form>
  {finances.length !== 0 && <FinanceTable finances={finances} refresh={()=>{setRefresh(!refresh)}} />}
  </div>
    );
  }
  
  export default Finance;