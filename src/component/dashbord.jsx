import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Dashbord() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('utilisateur')){
      navigate('/login')
    }
  })
  return (
    <div>dashbord</div>
  )
}
