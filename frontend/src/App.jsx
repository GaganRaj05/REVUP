import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import CardInfoPage from "./pages/CardInfoPage";
import { ToastContainer, toast } from 'react-toastify';
import ProfilePage from "./pages/ProfilePage";
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/user/profile",
    element:<ProfilePage/>
  },
  {
    path:"/events-info",
    element: <CardInfoPage/>
  }
])

function App() {
  return (
    <>
          <RouterProvider router={router}/>
          <ToastContainer position="top-center" autoClose={3000} />

    </>
  );
}
export default App;