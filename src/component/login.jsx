import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../App.css';
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate,Link} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
const notifyError = () => toast.error('Verifier votre mots de passe ou votre email');
const notifySucces = () => toast.success('Connexion reussi');
export default function SingUp() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('utilisateur'))
    navigate('/login')
    
  })
    const {
        register,
        handleSubmit,
      } = useForm();
      const onSubmit = data => {
        axios.get(`http://localhost:3000/utilisateur?email=${data.email}&Password=${data.Password}`).then((res)=>{
          if (res.data.length > 0) {
            localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
            navigate('/dashbord');
            <Toaster/>
            notifySucces();
            
          }else{
            <Toaster/>
            notifyError();
          }
        })

      };
      return (
    <div style={{marginTop:'10rem'}}>
        <form onSubmit= {handleSubmit(onSubmit)} style={{flexDirection:'column', display:'flex', gap:'1rem', margin:'auto', width:'20rem'}}>
            <h1 className='text-cente'>SingUp</h1>
            <TextField id="outlined-basic" label="email" variant="outlined" {...register("email", { required: true, 
 } )} />
            <TextField id="outlined-basic" label="Password" variant="outlined" {...register("Password",{ required: "Veuillez saisir un mots de passe", 
            minLength:{value:5, message:"Veuillez saisir un mots de passe de plus de 5"} })}  />
            <Button onClick={handleSubmit(onSubmit)} variant="contained">login</Button>
            <h5>Voulez-vous crée un compte ? <Link to='/singUp' style={{color:'#1565c0'}}>cliquer ici</Link></h5>
        </form>
    </div>
  )
}
