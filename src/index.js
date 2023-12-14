import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashbord from './component/dashbord';
import SingUp from './component/SingUp';
import Login from './component/login';
import App from './App'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const router = createBrowserRouter([
  {
    path:'/',
    element:< App/>
  },
  {
    path:'/SingUp',
    element:<SingUp/>
  },
  {
    path:'/login',
    element:<Login/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Toaster/>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
