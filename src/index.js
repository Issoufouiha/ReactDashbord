import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashbord from './component/dashbord';
import SingUp from './component/SingUp';
import Login from './component/login';
import App from './App'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query';
import Profilt from "./component/profilt";
const queryClient = new QueryClient();
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
  },
  {
    path:'/dashbord',
    element:<Dashbord/>,
  },
  {
    path:'/profilt',
    element:<Profilt/>,
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Toaster/>
        <RouterProvider router={router}>
        </RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
