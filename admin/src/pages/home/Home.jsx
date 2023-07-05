import React, { useEffect, useMemo, useState } from 'react';
import { userData } from '../../dummyData';
import "./home.scss";
import { userRequest } from '../../requestMethod';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import { ListItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  
  const [products, setProducts] = useState([]);
  const [staff, setStaff] = useState([]);
  const [sales, setSales] = useState([]);
  const [sold, setSold] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [array,setArray] = useState([]);

  const Product = ({productId, total}) => {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true)
        try {
          const res = await userRequest.get(`products/${productId}`);
          setProduct(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
      }
  
      fetchProduct()
    }, [productId])



    return (
      <div className="shoeItem">
          {
             loading ? <Stack sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          }}  width={"100%"} height={"100%"} spacing={2} direction="row">
                          <CircularProgress sx={{color: "#8363ac"}} />
                      </Stack>
                      :

               product && product  !== null ? 
                      <>
                        <div className="imgContainer">
                          <img src={product.image ? product.image : ""} alt="" />
                        </div>

                        <div className="info">
                          <span className="infoStats">
                            <span className="key">Sold</span>
                            <span className="value">{total}</span>
                          </span>
                          <span className="title">{product.title}</span>
                          <span className="price">$ {product.price}</span>
                          <Link to={`/product/${productId}`} className='link'><span>View Product</span></Link>
                        </div>
                      </>
                      :
                      <div className='noDisplay'>
                        Nothing
                      </div>
          }
      </div>
    )
  }

  useEffect(() => {
    const fetchSold = async () => {
      try {
        const res = await userRequest.get("orders/sold");
        setSold(res.data);
      } catch (error) {
        console.log(error)
      }
    }

    fetchSold()
  }, [])
  // console.log("Array: ", array)
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await userRequest.get("users");
        setStaff(res.data.filter(user => user.isAdmin === true));
      } catch (error) {
        console.log(error)
      }
    }

    fetchStaff()
  }, [])
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await userRequest.get("orders/sales");
        setSales(res.data[0].total)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSales()
  }, [])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await userRequest.get("products");
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])
  

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await userRequest.get("orders/revenue");
        setRevenue(res.data[0].total)
      } catch (error) {
        console.log(error)
      }
    }

    fetchRevenue();
  },[])
console.log(sold)
  return (
    <div className='home'>
      <Topbar title="Administrator Dashdoars" message="Hi, welcome to footwea"/>
       <div className="container">
        <div className="stats">
          <div className="statsItem">
            <span className="number">{products.length}</span>
            <span className="name">Shoes</span>
            <span className="status">Only verified Products</span>
            <h1>{products.length}</h1>
          </div>
          <div className="statsItem">
            <span className="number">{staff.length}</span>
            <span className="name">Staff</span>
            <span className="status">Only verified Staff</span>
            <h1>{staff.length}</h1>
          </div>
          <div className="statsItem">
            <span className="number">{sales}</span>
            <span className="name">Sales</span>
            <span className="status">Only Completed Sales</span>
            <h1>{sales}</h1>
          </div>
          <div className="statsItem">
            <span className="number">$ {revenue}</span>
            <span className="name">Revenue</span>
            <span className="status">From all verified sales</span>
            <h1>{revenue}</h1>
          </div>
        </div>

   

        <div className="shoes">
          <div className="heading">
            <h1 className="">Most Sold Shoes</h1>
            <Link className='link' to="/products"><span>All Products <KeyboardArrowRightOutlinedIcon className='icon'/> </span></Link>
          </div>
          <div className="shoeList">
            {
              sold.length > 0 && sold.map((item) => (
                <Product productId={item._id} total={item.total} key={item._id}/>
              ))
            }
            
          </div>
        </div>
       </div>
    </div>
  )
}

export default Home