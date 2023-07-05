import React, { useEffect, useState } from 'react';
import "./staff.scss";
import Topbar from '../../components/topbar/Topbar';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link } from 'react-router-dom';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { userRequest } from '../../requestMethod';
import Pagination from '../../components/pagination/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Loading from '../../components/loading/Loading';


const Staff = () => {

    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    // Get current Product
    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const list = staff.slice(indexOfFirstProduct, indexOfLastProduct);
    useEffect(() => {

        const fetchStuff = async() => {
            setLoading(true)
            try {
                const res = await userRequest.get("users");
                setStaff(res.data.filter(user => user.isAdmin === true));
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchStuff()

    },[])
  return (
    <div className='staff'>
        
        <Topbar title="Staff Members"  
            message="Hi, these are all verified staff members"
            action="Add staff"
            link="/staff/create"
            />


            {
                loading ?
                    <Loading />
                :
                staff.length > 0 &&
                <div className="container">
                    <div className="staffList">
                        <table>
                            <thead>

                                <tr>

                                    <th className='num'>#</th>
                                    <th>Staff</th>
                                    
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            {
                                
                                    staff.map((item, count) => (
                                        <tr className='white'>
                                            <td>
                                                <div className="wrapper">
                                                    {count + 1}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="wrapper staff">

                                                    <img src={item.image} alt="" />

                                                    <div className="info">

                                                        <span className="name">{item.firstname} {item.lastname}</span>
                                                        <span className='username'>{item.username}</span>
                                                    </div>
                                                    <div className="info">
                                                        <span className="title">Contact Details</span>
                                                        <span className="email"><EmailOutlinedIcon className='icon'/>{item.email}</span>
                                                        <span className='phone'><PhoneInTalkOutlinedIcon className='icon'/>{item.phone}</span>
                                                    </div>
                                                    <div className="info">
                                                        <span className="title">Job Details</span>
                                                        <span className="position"><BadgeOutlinedIcon className='icon' />Position: <span>Admin</span></span>
                                                        <span className='date'><CalendarMonthOutlinedIcon className='icon' />started: <span>5 days ago</span></span>
                                                    </div>
                                                </div>
                                            </td>


                                            <td>
                                                <div className="wrapper actions">
                                                    <Tooltip title="View" arrow placeholder='bottom'>

                                                    <Link to={`/staff/${item._id}`}><span><PreviewOutlinedIcon className='icon'/></span></Link>
                                                    </Tooltip>
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                
                                
                                
                            }
    

                        </table>

                        <Pagination productsPerPage={perPage} currentPage={currentPage} 
                        totalProducts={staff.length}  setCurrentPage={setCurrentPage}/>
                    </div>
                </div>
                
            }
    </div>
  )
}

export default Staff