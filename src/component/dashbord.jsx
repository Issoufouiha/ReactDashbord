import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import NavBars from './NavBars'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../App.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {useQueryClient, useQuery,useMutation} from '@tanstack/react-query';
export default function Dashbord() {
  const user = JSON.parse(localStorage.getItem("utilisateur"))
  const {register, handleSubmit, reset} = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {data: publications, isLoading} = useQuery({
    queryKey : ["pulications"],
    queryFn:()=> axios.get('http://localhost:3000/publications').then((res)=> res.data)
  })
  const mutation = useMutation({
    nutationFn: (pub)=>{
     return axios.post('http://localhost:3000/publications', pub)
    },
    onError: (error)=>{
      toast.error(' Une erreur est survenu');
      <Toaster/>
      reset();
    },
    onSuccess:()=>{ 
      toast.success('Pulication ajouter'); 
      <Toaster/>
      reset();
    }
  })
  if (isLoading){
    return <div>Chargement...</div>
  }
  const onSubmit = data =>{
    console.log(data);
    const allPublication = { 
      ...data,
      idUtlisateur : user.id,
      datePublication: new Date(),
      likePublication: 0,
      auteur:user.Names,
    }
    mutation.mutate(allPublication);
  }
  // useEffect(()=>{
  //   if(!localStorage.getItem('utilisateur')){
  //     navigate('/login');
  //   }

  // });
  return (
    <div>
      <NavBars/>
      <form id='publierForms' onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{fontSize:'30px', fontWeight:'bold'}}>Publier votre comtenu</h1>
      <TextField id="outlined-basic" style={{width:'100%'}} label="Ajouter" variant="outlined" spellCheck='true' size='small' multiline rows={4} {...register("myPublication", { required: true, minLength:{value:10} })} />
      <h4 style={{display:'flex', justifyContent:'start'}}>Ajouter URL de l'image de votre publication</h4>
      <TextField id="outlined-basic" style={{width:'100%'}} label="Ajouter" variant="outlined" size='small' {...register("URL", { required: true } )}/>
      <Button onClick={handleSubmit(onSubmit)} variant="contained">Publier</Button>

      </form>
      <div style={{justifyContent:'center', alignItems:'center', margin:'auto', display:'flex', flexDirection:'column',justifyContent:'space-between', gap:'30px'}}>
        {publications.map((autre) =><div style={{backgroundColor:'white', padding:'10px'}}>
          <span>{autre.auteur}</span>
          <p> {autre.myPublication} </p>
          <img src= {autre.URL} alt="PhotPublication" style={{width:'600px'}} />
          <span> {autre.datePublication} </span>
        </div>
        )}
      </div>
    </div>
  )
}
