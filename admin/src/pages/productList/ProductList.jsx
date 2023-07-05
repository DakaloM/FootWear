import React, { useEffect, useRef, useState } from 'react';
import "./productList.scss";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { userRequest } from '../../requestMethod';
import { deleteProducts, getProducts } from '../../redux/apiCalls';
import {useDispatch, useSelector} from "react-redux"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Topbar from '../../components/topbar/Topbar';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Pagination from '../../components/pagination/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Prompt from '../../components/prompt/Prompt';
import Tooltip from '@mui/material/Tooltip';
import Loading from '../../components/loading/Loading';
import Search from '../../components/search/Search';
import { current } from '@reduxjs/toolkit';

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [openPrompt, setOpenPrompt] = useState(false)
    const [promptMessage, setPromptMessage] = useState("")
    const [productId, setProductId] = useState("")
    const [mainWidth, setMainWidth] = useState(0)
    const [actionTrack, setActionTrack] = useState(0)
    const [search, setSearch] = useState("")
    const [displayList, setDisplayList] = useState([])
    const ref = useRef();

    useEffect(() => {
        const width = ref.current.offsetWidth;
        setMainWidth(width);
    }, [openPrompt])

    const deletePrompt = (id) => {
         setOpenPrompt(true)
         setPromptMessage("Are you sure you want to delete this product?")
         setProductId(id)
    }

  

    const notify = (type, message) => {
        if(type === "success"){
          
          toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } else {
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const compare = async (id) => {
        let foundProduct;
        try {
            const res = await userRequest.get("orders/sold");
            foundProduct =  res.data.find(item => item._id === id);
            
        } catch (error) {
            console.log(error)
        }

        const results = foundProduct ? foundProduct._id === id ? true : false : false
        return results
    }

    const handleDelete = async(id) => {
        // find if there's an order with this product
        
        const results = (await compare(id))
        
        if(results === true){
            notify("error", "There is an order with this product")
            
        } else {
            
            try {
                const res = await userRequest.delete(`products/${id}`)
                console.log(res.data)
                notify("success", res.data)
                setActionTrack(prev => prev + 1)
            } catch (error) {
                console.log(error)
                notify("error", "Operation Failed, try again later")
                
            }
        }
        
        
    }

    useEffect(() =>{

        const fetchProducts = async () => {
            setLoading(true)
            try {
                const res = await userRequest.get('products?new=true');
                setProducts(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchProducts();
    },[actionTrack]);

    useEffect(() =>{
        if(search !== ""){
            setDisplayList(products.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())))
        } else {
            setDisplayList(products)
        }
    },[search])

    
    // Get current Product
    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const currentProducts = search === "" ? products.slice(indexOfFirstProduct, indexOfLastProduct) :  displayList.slice(indexOfFirstProduct, indexOfLastProduct)
    
    console.log(currentProducts)
   
    console.log(search)
    
    return (
        <div className='productList' ref={ref}>
            {
                openPrompt && <Prompt setOpenPrompt={setOpenPrompt} message={promptMessage} containerWidth={mainWidth} action={handleDelete}
                    actionId={productId}
                
                />
            }
            <ToastContainer />
            <Topbar 
                    title="Product List" 
                    message="view all products"
                    action="add Shoe"
                    link="/products/create"
                />

            {
                loading ? <Loading />
                :
                products.length > 0 ?
                <div className="container">

                    <Search setSearch={setSearch}/>
                    
                    <div className="shoeList">
                        <table>
                            <thead>
                                <tr>
                                    <th className='num'>#</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Sizes</th>
                                    <th>Colors</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>                                

                                {currentProducts.map((item, count) => (

                                
                                    <tr className={count % 2 === 0 ?'white': "" } key={item._id}>
                                        <td>
                                            <div className="wrapper">
                                                {item.count}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="wrapper product">

                                                <img src={item.image} alt="" />

                                                <div className="info">
                                                    <span className="name">{item.title}</span>
                                                    <span className="price"><AccountBalanceWalletIcon className='icon' />${item.price}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="wrapper">
                                                <ul>
                                                    {item.categories.map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="wrapper">
                                                <ul>
                                                    {item.size.map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="wrapper">
                                            <ul className='colors'>

                                                    {item.color.map((item) => (
                                                        <li key={item} style={{backgroundColor: `${item}`}}></li>
                                                    ))}
                                                
                                                
                                            </ul>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="wrapper">
                                            <span className={item.inStock? 'status' : 'status sold'}>{item.inStock? "inStock" : "SoldOut"}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="wrapper actions">
                                                <Tooltip title="View" arrow placement='bottom'>

                                                    <Link to={`/product/${item._id}`}><span><PreviewOutlinedIcon className='icon'/></span></Link>
                                                </Tooltip>

                                                <Tooltip title="Delete" arrow placement='bottom'>

                                                    <span onClick={() => deletePrompt(item._id)}><DeleteOutlineOutlinedIcon className='icon'/></span>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>

                                ))}

                            </tbody> 
                        </table>
                    </div>
                            
                    
                </div>
                :
                <span className="notFoundText">No products fount</span>
            }

            { <Pagination productsPerPage={perPage} currentPage={currentPage} 
                totalProducts={search !== "" ? displayList.length : products.length}  setCurrentPage={setCurrentPage}/>}

            
            
        
        </div>
    )
}

export default ProductList