import React, { useEffect, useState } from 'react';
import "./review.scss";
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { publicRequest } from '../../requestMethod';

const Review = ({review}) => {

    const [rating, setRating ] = useState(0);
    const [productRating, setProductRating] = useState([])

    useEffect(() => {
        const fetProductReviews = async () => {
        try {
            const res = await publicRequest.get(`/reviews/find/product/${review.productId}`);
            setProductRating(res.data)
        } catch (error) {
            console.log(error)
        }
        }
        fetProductReviews();

        
    }, [])

    useEffect(() => {
        if (productRating.length > 0){
          const total = productRating[0].total;
          const count = productRating[0].count;
          setRating((Math.floor(total / count)).toFixed(0))
        } else {
          setRating(0)
        }
      }, [productRating])

  return (
        <div className="review">
            <div className="user">
                <img src={review.image} alt="" />
                <span className="name">{review.name}</span>
            </div>
            <div className="stars">

                {Array(5).fill().map((_, index) => (

                    rating >= index + 1 ? (
                    <StarIcon className='icon' key={index}/>
                    ): (
                    <StarBorderOutlinedIcon  className='icon' key={index}/>
                    )
                    
                ))}
                
            </div>

            <p className="message">
                {review.message}
            </p>
        </div>

  )
}

export default Review