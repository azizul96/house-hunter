import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Layout from './Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Dashboard from './Layout/Dashboard';
import AddHome from './pages/Dashboard/AddHome';
import AuthProvider from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Owner from './pages/Dashboard/Owner/Owner';
import Renter from './pages/Dashboard/Renter/Renter';
import EditHouse from './pages/Dashboard/Owner/EditHouse';
import PrivateRoute from './Private/PrivateRoute';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "owner",
        element: <Owner></Owner>
      },
      {
        path: "owner/update/:id",
        element: <EditHouse></EditHouse>,
        loader: ({params})=> fetch(`http://localhost:5000/update/${params.id}`)
      },
      {
        path: "renter",
        element: <Renter></Renter>
      },
      {
        path: "add-house",
        element: <AddHome></AddHome>
      },
    ]
  }
]);

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    <Toaster/>
  </React.StrictMode>,
)
