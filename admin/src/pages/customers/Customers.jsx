import React, { useEffect, useState } from 'react';
import "./customers.scss";
import Topbar from '../../components/topbar/Topbar';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { userRequest } from '../../requestMethod';
import Customer from '../../components/customer/Customer';
import Pagination from '../../components/pagination/Pagination';
import Loading from '../../components/loading/Loading';

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);



    // Get current Product
    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const list = customers.slice(indexOfFirstProduct, indexOfLastProduct);
    
    useEffect(() => {

        const fetchCustomers = async() => {
            setLoading(true);
            try {
                const res = await userRequest.get("orders/customers");
                console.log(res.data);
                setCustomers(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
        fetchCustomers()

    },[])
  return (
    <div className='customers'>

        <Topbar title="Customers"  message="Hi, here's the list of all our customers"/>

        {
            loading ? <Loading />
            :
            customers.length > 0 ?
            <div className="container">
                    <div className="shoeList">
                        <table>
                            <thead>
                                <tr>
                                    <th className='num'>#</th>
                                    <th>Customer</th>
                                    <th>Total Spending</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    
                                    
                                    list.map((item, count) => (
                                        <tr className={count % 2 === 0? 'white' : ''}>
                                            <td>
                                                <div className="wrapper">
                                                    {count + 1}
                                                </div>
                                            </td>
                                            <td>
                                                <Customer id={item._id} customer={true}/>
                                            </td>

                                            <td>
                                                <div className="wrapper stats">
                                                    <span className="spending"><LocalAtmOutlinedIcon className='icon'/>$ {item.total}</span>
                                                    <span className="count"><ShoppingBagOutlinedIcon className='icon'/>{item.quantity}</span>
                                                </div>
                                            </td>

                                            

                                            
                                        </tr>
                                    ))
                                    
                                    
                                }
                        
                        </tbody>


                        </table>

                        <Pagination productsPerPage={perPage} currentPage={currentPage} 
                            totalProducts={customers.length}  setCurrentPage={setCurrentPage}/>
                    </div>
            </div>
            :
              <span className="notFoundText">No Customers found</span>
        }
        
    </div>
  )
}

export default Customers