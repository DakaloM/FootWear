import React, { useEffect, useRef, useState } from 'react';
import "./reviews.scss";
import Topbar from '../../components/topbar/Topbar';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { userRequest } from '../../requestMethod';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import Pagination from '../../components/pagination/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Prompt from '../../components/prompt/Prompt';
import Tooltip from '@mui/material/Tooltip';
import Loading from '../../components/loading/Loading';
import Search from '../../components/search/Search';

const Reviews = () => {

    const [reviews, setReviews] = useState([]);
    const [trackChange, setTrackChange] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [openPrompt, setOpenPrompt] = useState(false)
    const [promptMessage, setPromptMessage] = useState("")
    const [reviewId, setReviewId] = useState("")
    const [mainWidth, setMainWidth] = useState(0)



    const ref = useRef();

    useEffect(() => {
        const width = ref.current.offsetWidth;
        setMainWidth(width);
    }, [openPrompt])

    const deletePrompt = (id) => {
         setOpenPrompt(true)
         setPromptMessage("Are you sure you want to delete this product?");
         setReviewId(id);
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



    const Product = ({productId}) => {

        const [product, setProduct] = useState()
        const [loading, setLoading] = useState(false)

        useEffect(() =>{
            const fetchProduct = async () => {
                setLoading(true)
                try {
                    const res = await userRequest.get(`products/${productId}`);
                    setProduct(res.data)
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }
            fetchProduct();
        }, [])


        console.log(product)

        return (
                loading ? <Loading /> 
                :
                product  ?
                <div className="wrapper product">

                    <img src={product.image} alt="" />

                    <div className="info">
                        <span className="name">{product.title}</span>
                        <span className="price"><AccountBalanceWalletIcon className='icon' />$ {parseFloat(product.price).toFixed(2)}</span>
                    </div>
                </div>
                : 
                <span style={{color: "red", fontSize: "14px"}}>Deleted product</span>

        )
    }



    useEffect(() => {
        const fetchedReviews = async () => {
            setLoading(true)
            
            try {
                const res = await userRequest.get("reviews");
                setReviews(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchedReviews()
    }, [trackChange])




    // Get current Product
    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const currentProducts = reviews.slice(indexOfFirstProduct, indexOfLastProduct);

    const approveReview = async (id) => {
        try {
            const res = await userRequest.put(`reviews/${id}`, {status: 'approved'});
            console.log(res.data)
            setTrackChange(trackChange + 1)
        } catch (error) {
            console.log(error)
        }
    }
    const disapproveReview = async (id) => {
        try {
            const res = await userRequest.put(`reviews/${id}`, {status: 'pending'});
            console.log(res.data)
            setTrackChange(trackChange + 1)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteReview = async (id) => {
        try {
            const res = await userRequest.delete(`reviews/${id}`);
            console.log(res.data)
            setTrackChange(trackChange + 1)
            notify("success", res.data)
        } catch (error) {
            console.log(error)
            notify("error", "Failed to delete review, try again later")
        }
    }


  return (
    <div className='reviews' ref={ref}>
        {
            openPrompt && <Prompt setOpenPrompt={setOpenPrompt} containerWidth={mainWidth}
                action={deleteReview} actionId={reviewId} message={promptMessage}
            />
        }
        <ToastContainer />
        <Topbar title="Reviews" 
            message="Hi, you are seeing all our reviews"
        />
        {
            loading ? <Loading />
            :
            reviews.length > 0 ?
            <div className="container">

                <div className="shoeList">
                    
                        <table>
                            <thead>
                                <tr>

                                    <th className='num'>#</th>
                                    <th>Product</th>
                                    <th>Customer</th>
                                    <th>Message</th>
                                    <th>Rating</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            { 
                                currentProducts.map((review, count) =>(


                                    <tr className={count % 2 === 0? 'white': ""}>
                                        <td>
                                            <div className="wrapper">
                                                {count + 1}
                                            </div>
                                        </td>
                                        <td>
                                            <Product productId={review.productId} />
                                        </td>

                                        <td>
                                            <div className="wrapper customer">

                                            <img src={review.image} alt="" />

                                            <div className="info">
                                                <span className="name">{review.name}</span>
                                                
                                            </div>
                                            </div>
                                        </td>

                                        <td className='messageTd'>
                                            <div className="wrapper">
                                                <p className='message'>
                                                    {review.message}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="wrapper">
                                                <div className="stars">

                                                    {Array(5).fill().map((_, index) => (

                                                    review.rating >= index + 1 ? (
                                                        <StarIcon className='icon' key={index}/>
                                                    ): (
                                                        <StarBorderOutlinedIcon  className='icon' key={index}/>
                                                    )
                                                    
                                                    ))}

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="wrapper">
                                            <span className={`status ${review.status}`}>{review.status}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="wrapper actions">
                                                {/* <span><PreviewOutlinedIcon className='icon'/></span> */}
                                                {
                                                    review.status !== "approved" && 
                                                        <Tooltip title="Approve" arrow placement='bottom'>
                                                        <span onClick={() => approveReview(review._id)}>
                                                            <DoneOutlineOutlinedIcon className='icon'/>
                                                        </span>
                                                        </Tooltip>
                                                }
                                                {
                                                    review.status !== "pending" &&
                                                        <Tooltip title="Disaprove" arrow placement='bottom'>
                                                            <span onClick={() => disapproveReview(review._id)}>
                                                                <PendingOutlinedIcon className='icon'/>
                                                            </span>
                                                        </Tooltip>
                                                }
                                                <Tooltip title="Delete" arrow placement='bottom'>
                                                    <span onClick={() => deletePrompt(review._id)}>
                                                        <DeleteOutlineOutlinedIcon className='icon'/>
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>

                                ))
                            }

                        </table> 
                    

                    <Pagination productsPerPage={perPage} currentPage={currentPage} 
                    totalProducts={reviews.length}  setCurrentPage={setCurrentPage}/>
                </div>

                
            </div>
            :
            <span className="notFoundText">No reviews found</span>
        }
    </div>
  )
}

export default Reviews