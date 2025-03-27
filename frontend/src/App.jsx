import React from 'react';
import Home from './components/home';
import EventDetails from './pages/Eventdetails';
import CarDetails from './pages/CarDetails';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

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
  }
])


const App = () => {
  return (
    <RouterProvider router = {Router} />
  );
};

export default App;