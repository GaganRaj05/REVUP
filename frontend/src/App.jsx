import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/login";
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}
export default App;