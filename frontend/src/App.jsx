import React from 'react';
import Home from './components/Home';
import EventDetails from './pages/Eventdetails';
import CarDetails from './pages/CarDetails';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import UploadVehicle from './pages/UploadVehicle';

const Router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/event/:eventId",
    element:<EventDetails/>
  },
  {
    path:"/rent/:catId",
    element:<CarDetails/>
  },
  {
    path:"/upload-vehicle",
    element:<UploadVehicle/>
  }
])


const App = () => {
  return (
    <RouterProvider router = {Router} />
  );
};

export default App;