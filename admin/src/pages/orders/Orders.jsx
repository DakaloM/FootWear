import React, { useEffect, useState } from 'react';
import "./orders.scss";
import Topbar from '../../components/topbar/Topbar';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import { userRequest } from '../../requestMethod';
import Customer from '../../components/customer/Customer';
import { Link } from 'react-router-dom';
import Review from '../../components/review/Review';
import Pagination from '../../components/pagination/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Loading from '../../components/loading/Loading';

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    // Get current order
    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const currentProducts = orders.slice(indexOfFirstProduct, indexOfLastProduct);


    useEffect(() => {

        const fetchOrders = async() => {
            setLoading(true)
            try {
                const res = await userRequest.get("orders");
                setOrders(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchOrders()

    },[])

   
  return (
    <div className='orders'>
        <Topbar title="All Orders" message="Hi!, look at our orders"/>

        {
            loading ? <Loading />

            :
            orders.length > 0 ?
            <div className="container">
                
                    <div className="orderList">
                        <table>
                            <thead>
                                <tr style={{color: "white"}}>
                                    <th className='num'>ID</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                            {orders.map((order, count) => (

                            
                                <tr className={count % 2 === 0 && 'white'} key={order._id}>
                                    <td>
                                        <div className="wrapper">
                                            <span className='id'>{order._id}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="wrapper">
                                            <span className='date'>{order.createdAt}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="wrapper">

                                            <Customer id={order.userId} />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="wrapper">
                                            <span className="price">$ {order.amount.toFixed(2)}</span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="wrapper">
                                            <span className={`status ${order.status}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </td>
                                    
                                    

                                    <td>
                                        <div className="wrapper actions">
                                            <Tooltip title="View" arrow placement='bottom'>

                                                <Link to={`/order/${order._id}`} style={{textDecoration: "none"}}><span><PreviewOutlinedIcon className='icon'/></span></Link>
                                            </Tooltip>
                                            
                                        </div>
                                    </td>
                                </tr>

                            ))}

                        </tbody>




                        </table>
                    </div>

                
                    <Pagination productsPerPage={perPage} currentPage={currentPage} 
                    totalProducts={orders.length}  setCurrentPage={setCurrentPage}/>
            </div>
            :
            <span className="notFoundText">No orders Found</span>
        }

            
    </div>
  )
}

export default Orders