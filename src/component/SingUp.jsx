import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '../logo.svg';
import '../App.css';
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const notifyError = () => toast.error('Verifier votre mots de passe');
const notifySucces = () => toast.success('Inscription reussi');
export default function SingUp() {
  const navigate = useNavigate();
    const {
        register,
        handleSubmit,
      } = useForm();
      const onSubmit = data => {
        if(data.Password !== data.ConfirmationPassword){
          <Toaster/>
          notifyError();
        }
        else if(data.Password == data.ConfirmationPassword){
          <Toaster/>
          axios.get(`http://localhost:3000/utilisateur?email=${data.email}`).then((res)=>{
            if (res.data.length > 0) {
              toast.error("un compte existe déjà avec cette adresse")
              
            }else{
              axios.post("http://localhost:3000/utilisateur", data);
              notifySucces();
              navigate("/login")
            }
          })
        }
      };
      return (
    <div className='bg-slate-400'>
        <form onSubmit= {handleSubmit(onSubmit)} style={{flexDirection:'column', display:'flex', gap:'1rem', margin:'auto', width:'20rem'}}>
            <h1 className='text-cente'>SingUp</h1>
             <img id='myLogo' src= {logo} alt="logo" />
            <TextField id="outlined-basic" label="Name" variant="outlined" {...register("Names", { required: true } )} />
            <TextField id="outlined-basic" label="email" variant="outlined" {...register("email", { required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
 } )} />
            <TextField id="outlined-basic" label="Password" variant="outlined" {...register("Password",{ required: "Veuillez saisir un mots de passe", 
            minLength:{value:5, message:"Veuillez saisir un mots de passe de plus de 5"} })}  />
            <TextField id="outlined-basic" label="Confirmation Password" variant="outlined" {...register("ConfirmationPassword", { required: true })}  />
            <Button onClick={handleSubmit(onSubmit)} variant="contained">S'inscrire</Button>
        </form>
    </div>
  )
}
