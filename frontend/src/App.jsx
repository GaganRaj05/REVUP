import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/login";
import CardInfoPage from "./pages/CardInfoPage";
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/events-info",
    element: <CardInfoPage/>
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}
export default App;