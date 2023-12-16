import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import NavBars from './NavBars'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../App.css'
import { useForm } from 'react-hook-form';
export default function Dashbord() {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const onSubmit = data =>{

  }
  useEffect(()=>{
    if(!localStorage.getItem('utilisateur')){
      navigate('/login');
    }
  })
  return (
    <div>
      <NavBars/>
      <form id='publierForms'>
        <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Publier votre comtenu</h1>
      <TextField id="outlined-basic" style={{width:'100%'}} label="Ajouter" variant="outlined" size='small' multiline rows={4} {...register("Names", { required: true } )} />
      <h4 style={{display:'flex', justifyContent:'start'}}>Ajouter URL de l'image de votre publication</h4>
      <TextField id="outlined-basic" style={{width:'100%'}} label="Ajouter" variant="outlined" size='small' {...register("Names", { required: true } )} />
      <Button onClick={handleSubmit(onSubmit)} variant="contained">Publier</Button>

      </form>
    </div>
  )
}
