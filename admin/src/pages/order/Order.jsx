import React, { useEffect, useState } from 'react';
import "./order.scss";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod';
import Topbar from '../../components/topbar/Topbar';

const Order = () => {

    const [order, setOrder] = useState([]);
    const orderId = useParams().orderId
    const user = useSelector(state => state.user.currentUser)

    console.log("orderId: ", typeof(orderId))
    console.log("UserId: " ,typeof(user._id))

    

    
    useEffect(() => {
        const fetchOrder = async() => {
            try {
                const res = await userRequest.get(`orders/${user._id}/${orderId}`);
                setOrder(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchOrder();
    }, [user.id, orderId])

    console.log(order)
  return (
    <div className='order'>
        <Topbar title="Order Details" message="Hi, Here are the details about the current order"/>
        <div className="container display">
            
            

            {order?
            <div className="order">
                <div className="top">
                    <span className="header">Order Summary</span>
                    <span className="id">Order Id: <span>{order._id}</span></span>
                    <span className="count">Number of Items: <span>{order.quantity}</span></span>
                    <span className="amount">Amount: <span>${parseFloat(order.amount).toFixed(2)}</span></span>
                    <div className="status">
                        <span className="statusKey">Status: <span className={order.status}>{order.status}</span></span>
                    </div>
                </div>

                <div className="bottom">
                    <span className="header">Order Products</span>

                    <div className="labels">
                        <span className="product">Product</span>
                        <span className="quantity">Quantity</span>
                        <span className="subTotal">Subtotal</span>
                    </div>
                    <div className="productsList">
                        
                        {
                            order.products && order.products.map((product) => (

                                <div className="listItem">
                                    <div className="product">
                                        <div className="imgContainer">
                                            <img src={product.image} alt="" />
                                        </div>
                                        <div className="info">
                                            <span className="name">{product.title}</span>
                                            <span className="price">${product.price.toFixed(2)}</span>
                                        </div>
                                        
                                    </div>

                                    <span className="quantity">{product.quantity}</span>
                                    <span className="subTotal">${(product.price * product.quantity).toFixed(2)}</span>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div> 
            : "No Orders made Yet"}
            
        </div>

        
    </div>
  )
}

export default Order