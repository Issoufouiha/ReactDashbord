import * as React from 'react';
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import NavBars from './NavBars'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../App.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
export default function Dashbord() {
  const [publications, setPublication]= React.useState([]);
  const user = JSON.parse(localStorage.getItem("utilisateur"))
  const {register, handleSubmit, reset} = useForm();
  const navigate = useNavigate();
  const onSubmit = data =>{
    console.log(data);
    const allPublication = {
      ...data,
      idUtlisateur : user.id,
      datePublication: new Date(),
      likePublication: 0,
      auteur:user.Names,
    }
    axios.post("http://localhost:3000/publications", allPublication).then((res)=>{
      reset();
      console.log(res.data);
      toast.success('Pulication ajouter');
      <Toaster/>
      
    })

  }
  useEffect(()=>{
    if(!localStorage.getItem('utilisateur')){
      navigate('/login');
      axios.get('http://localhost:3000/publications').then((res)=>{
        setPublication(res.data)

      })
    }
  })
  return (
    <div>
      <NavBars/>
      <form id='publierForms' onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Publier votre comtenu</h1>
      <TextField id="outlined-basic" style={{width:'100%'}} label="Ajouter" variant="outlined" size='small' multiline rows={4} {...register("myPublication", { required: true, minLength:{value:10} })} />
      <h4 style={{display:'flex', justifyContent:'start'}}>Ajouter URL de l'image de votre publication</h4>
      <TextField id="outlined-basic" style={{width:'100%'}} label="Ajouter" variant="outlined" size='small' {...register("URL", { required: true } )}/>
      <Button onClick={handleSubmit(onSubmit)} variant="contained">Publier</Button>

      </form>
      <h1>Tous mes publication</h1>
      <div>
        {publications.map((publication) =><div>
          <span>{publication.auteur}</span>
          <span> {publication.datePublication} </span>
          <p> {publication.myPublication} </p>
          <img src= {publication.URL} alt="PhotPublication" />
        </div>
        )}
      </div>
    </div>
  )
}
