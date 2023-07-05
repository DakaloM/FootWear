import {
  BrowserRouter as Router,
  RouterProvider,
  Redirect,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import "./app.scss";
import Home from "./pages/home/Home";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { useSelector } from "react-redux";

import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import Reviews from "./pages/reviews/Reviews";
import Updates from "./pages/updates/Updates";
import Messages from "./pages/messages/Messages";
import Profile from "./pages/profile/Profile";
import Staff from "./pages/staff/Staff";
import ViewStaff from "./pages/viewStaff/ViewStaff";
import AddStaff from "./pages/addStaff/AddStaff";
import { tokenChecker } from "./requestMethod";
import Order from "./pages/order/Order";
function App() {

  const currentUser = useSelector(state => state.user.currentUser)


  const Layout = () => {
    return(
      <div className="appContainer"
      style={{
        display: "flex",
        margin: "0",
        justifyContent: "space-between",
    }}>

        <Sidebar />
        <div style={{flex: "4", maxHeight:"100vh", overflowY:"scroll"}}>

          
          <Outlet />

        </div>
      </div>
    )
  }

  const ProtectedRoutes = ({children}) => {
    if(currentUser === null) {
      return <Navigate to={"/login"}/>;
    }
    else{
      if(currentUser.isAdmin === false) {
          return <Navigate to={"/login"}/>;
      }
    }
    
    return children;
  }

  const router = createBrowserRouter([
    {path: "/login", element: <Login />},
    // {path: "/register", element: <Register />},
    {
      path: "/", 
      element: 
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>,

        children: [
          {path: "/", element: <Home />},
          {path: "/staff", element: <Staff />},
          {path: "/staff/:id", element: <ViewStaff />},
          {path: "/staff/create", element: <AddStaff />},
          {path: "/products", element: <ProductList />},
          {path: "/product/:id", element: <Product />},
          {path: "/products/create", element: <NewProduct />},
          {path: "/users/create", element: <NewUser />},
          {path: "/orders", element: <Orders />},
          {path: "/order/:orderId", element: <Order />},
          {path: "/customers", element: <Customers />},
          {path: "/reviews", element: <Reviews />},
          {path: "/profile/:id", element: <Profile />},
        ]
    }
   
  ])

  
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
