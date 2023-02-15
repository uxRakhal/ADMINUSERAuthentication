import React, { useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'


const ChangePassword = () => {
 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
  axios.put(`http://localhost:5000/changepassword/user/${id}`, {oldPassword, newPassword})
  .then(res=>{
    console.log(res);
  })
  .catch(err => {
    console.log(err);
    if(err.res.status===401)
      {
        alert('Old password didnt match. Please try again')
      }
  })
  if(oldPassword === newPassword){
    alert('New password cannot be oldPassword')
  }
  alert('Kindly Login Again')
  navigate('/login/user')
}
  return (
    <div style={{
      display: "flex",justifyContent: "center",alignItems: "center"}} >
      <form  onSubmit={handleSubmit}>
        <label>
        Old PassWord
        <input type="text" name="oldPassword" value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)}></input>  
        </label> 
        <br/>
        <label>
        New PassWord
        <input type="text" name="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}></input>  
        </label> 
        <br/>
        <button type="submit">Submit</button>
      </form>
    </div>

  )
}


export default ChangePassword;