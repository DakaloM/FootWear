
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart } from 'recharts';
import "./sidebar.scss";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { logout } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const Sidebar = () => {
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className='sidebar'>
        <div className="container">
          <Link to="/" style={{textDecoration: "none"}}><h1 className="title">FootWear</h1></Link>

          <ul>
            <span className="linkTitle">Main</span>
            <Link className='link' to="/"><li><DashboardOutlinedIcon className='icon'/> Dashboard</li></Link>
            <Link className='link' to="/products"><li><BusinessOutlinedIcon className='icon'/> All Shoes</li></Link>
            <Link className='link' to="/orders"><li><InventoryOutlinedIcon className='icon'/>Orders</li></Link>
            
            <span className="linkTitle">Users</span>
            <Link className='link' to="/customers"><li><AccountCircleOutlinedIcon className='icon'/>Customers</li></Link>
            <Link className='link' to="/staff"><li><LocalPoliceOutlinedIcon className='icon'/>Staff</li></Link>
            <Link className='link' to="/reviews"><li><MessageOutlinedIcon className='icon'/>Reviews</li></Link>
            
          </ul>

          <div className="user">
            <div className="imgContainer">
              <img src={user.image? user.image : "/img/avatar.jpg"} alt="" />
            </div>
            <span className="name">{user.firstname + " " + user.lastname}</span>
            <span className="email">{user.email}</span>
            <div className="actions">
              <span onClick={handleLogout}><LogoutOutlinedIcon className='icon mr'/> Log Out</span>
              <Link style={{textDecoration: "none"}} to={`profile/${user._id}`}><span><RemoveRedEyeIcon className='icon mr'/>Profile</span></Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Sidebar