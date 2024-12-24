import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./Layout/RootLayout";
import UserPage from "./pages/UserPage";
import OrderPage from "./pages/OrderPage";

function App() {



  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children: [
        {
          index: true, 
          element: <Navigate to="/users" replace />
        },
        {
          element: <OrderPage/> ,
          path: "/orders"
        },
        {
          element:   <UserPage/>,
          path: "/users"
        }
      ]
    },
  ]);

  return (
    <div className="App">
       <RouterProvider  router={router} />
    </div>
  );
}

export default App;
