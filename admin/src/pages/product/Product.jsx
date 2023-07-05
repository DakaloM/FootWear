import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import "./product.scss";
import Topbar from '../../components/topbar/Topbar';
import { userRequest } from '../../requestMethod';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import Review from '../../components/review/Review';
import Loading from '../../components/loading/Loading';



const Product = () => {

  const [openUpdate, setOpenUpdate] = useState(false);
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [product, setProduct] = useState([]);
  const [extraImages, setExtraImages] = useState([]);
  const [uploadImgages, setUploadImgages] = useState([]);
  const [addEtraImages, setAddEtraImages] = useState(false);
  const [tracker, setTracker] = useState(0);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [inputs, setInputs] = useState([])
  const [color, setColor] = useState([])
  const [uplopadProgress, setUplopadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");
  const [updateProductProgress, setUpdateProductProgress] = useState(0);
  const [updateProductProgressMessage, setUpdateProductProgressMessage] = useState("");
  const [updateEtraImages, setUpdateEtraImages] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  

  const productId = useParams().id;


  useEffect(() =>{
    if(uplopadProgress === 100){
      window.setTimeout(() =>{
        setUploadMessage(0)
      }, 5000)
    }
  },[uplopadProgress]);

  

 

  const handleColors = (e) => {
    setColor(e.target.value.split(","))
    
  }

  const handleInputs = (e) => {
    setInputs(prev => {
        return {...prev, [e.target.name]: e.target.value}
    })
  }



  const handleCat = (e) => {
    let array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value)
      }

      setCategories(array)
    
}

const handleSize = (e) => {
    let array = []
    var checkboxes = document.querySelectorAll('#size:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value)
      }

      setSize(array)
    
}

const handleSubmit = (e) => {
  e.preventDefault();

  const fileName = new Date().getTime() + file.name
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
  (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setUpdateProductProgress(progress)
      switch (snapshot.state) {
      case 'paused':
          console.log('Upload is paused');
          setUpdateProductProgressMessage('Upload is paused');
          break;
      case 'running':
          console.log('Upload is running');
          setUpdateProductProgressMessage('Upload is running');
          break;
      }
  }, 
  (error) => {
      // Handle unsuccessful uploads
  }, 
  () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      // console.log('File available at', downloadURL);

          const product = {...inputs, categories, size, color, image: downloadURL};
          console.log(product)
          try {
              const res = await userRequest.put(`products/${productId}`, product);
              console.log(res.data)
              setFile();
              setTracker(tracker + 1)
          } catch (error) {
              console.log(error)
          }
      });
  }
  );
  
}


  const handleOpenUpdate = () => {
    if(addEtraImages === true){
      setAddEtraImages(false)
    }
    setOpenUpdate(true);
    
    // window.setTimeout(() =>{
    //   window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth'
    //   });
      
    // }, 2000)
    
  }

  useEffect(() =>{
    const fetchProduct = async() => {
      setLoading(true)
      try {
        const res = await userRequest.get(`products/${productId}`)
        setProduct(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchProduct();
  }, [tracker])


  useEffect(() =>{
    const fetchReviews = async() => {
      try {
        const res = await userRequest.get(`reviews`)
        setReviews(res.data.filter(item => item.productId === productId))
      } catch (error) {
        console.log(error)
      }
    }

    fetchReviews();
  }, [tracker])

  

  const handleChange = (e) => {
    for(let i = 0; i < e.target.files.length; i++) {

      let newImage = e.target.files[i]
      newImage["id"] = new Date().getTime() + Math.floor(Math.random() * 1000) + 1;
      setImages(prev => [...prev, newImage])
    }
  }



  const handleAddExtraImages = async (e) => {
      e.preventDefault();
      let imageUrls = [];
      let promises = [];
      images.map((image) => {

        let imageLink = "";
        const fileName = new Date().getTime() + image.name
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        promises.push(uploadTask);

        
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUplopadProgress(progress)
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                setUploadMessage("Upload is paused")
                break;
            case 'running':
                console.log('Upload is running');
                setUploadMessage(progress === 100 ? "Done..." : "Uploading")
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
             const url =  getDownloadURL(uploadTask.snapshot.ref)
              
            imageUrls.push(url)
            
  
        }
        );

        
      })


      Promise.all(promises)
      .then( (values) => {
        return Promise.all(imageUrls.map(url => url))
      }).then( (values) =>{
        const x = values
        sendData(x)
      })
      .catch((err) => console.log(err))
      // Promise.all(promises)
      // .then( (values) => {
      //   return Promise.all(values.map(value => value));
      // }).then(value => {
      //   const x = imageUrls
      //   console.log(x)
      //   sendData(x)
      // })
      // .catch((err) => console.log(err))
      
  }

 

  const sendData =  async(urls) => {
    if(updateEtraImages === true){

      try {
        const res =  await userRequest.put(`images/${product._id}`, {
          
          images: urls
        })
        console.log(res.data)
        setTracker(tracker + 1)
      } catch (error) {
        console.log(error)
      }
    } else {
        try {
          const res =  await userRequest.post("images", {
            productId: productId,
            images: urls
          })
          console.log(res.data)
          setTracker(tracker + 1)
        } catch (error) {
            console.log(error)
        }
    }
  }

  // const handleAddExtraImages = async (e) => {
  //     e.preventDefault();
  //     const imageUrls = await UploadEtraImages();

  //     try {
  //       const res = userRequest.post("images", {
  //         productId: product,
  //         images: imageUrls
  //       });
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error)
  //     }

      
      
  // }

  useEffect(() =>{
    const fetchProductImages = async() => {
      try {
        const res = await userRequest.get(`images/${productId}`)
        setExtraImages(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProductImages();
  }, [tracker])

  
  

//  console.log(images)
//  console.log("Image links: ", urls)

  
  return (
    <div className='product'>
        <Topbar title="View Product"  message="Hi!, below is the details about the requested product"/>
        {
          loading ? <Loading />
          :
          <div className="container">
            <div className="top">
              <div className="col">

                
                <div className="gallery">
                

                  <div className="display">
                    <img src={product.image} alt="" />
                  </div>
                </div>

                <div className={addEtraImages? "form active" : "form"}>
                  <span className="iconSpan" onClick={() => {setAddEtraImages(false); setImages([])}}><CancelIcon className='icon' /></span>
                  <span className="header">Add Extra Images</span>
                  <form action="" encType='multipart-form-data'>
                    {
                      uplopadProgress === 0 ?
                      <div className="images">
                      {images && images.length > 0 && images.map(image => (
                        <img src={URL.createObjectURL(image)} alt="" key={image.id}/>
                        // <span>{image[1].name}</span>
                      ))}
                      </div>
                      : <div className="uploadProgress">
                        <span>{uploadMessage} {uplopadProgress}%</span>
                      </div>
                    }
                    <div className="inputGroup">
                      <label htmlFor="myFiles">Chose Files (max 3) <UploadFileIcon  className='icon'/></label>
                      <input type="file" id='myFiles' name='myFiles' placeholder='file' multiple style={{display: "none"}}
                          onChange={handleChange}
                      />

                      <button onClick={handleAddExtraImages}>Save</button>
                    </div>
                  </form>
                </div>
                
                <div className="info">
                
                  <div className="crusial">
                    <div className="group">
                      <span className="price">$ {parseFloat(product.price).toFixed(2)}</span>
                      <span className="name">{product.title}</span>
                    </div>

                    <div className="stars">

                          {Array(5).fill().map((_, index) => (

                            product.rating >= index + 1 ? (
                              <StarIcon className='icon' key={index}/>
                            ): (
                              <StarBorderOutlinedIcon  className='icon' key={index}/>
                            )
                            
                          ))}
                          
                    </div>

                    
                  </div>

                  <div className="rest">
                        
                        <div className="row">
                          {
                            product.categories && product.categories.map(category => (
                              <span className='categories' key={category}>{category}</span>
                            ))
                          }
                        </div>

                        <div className="row">
                          <span>Colors: </span>
                          <ul >
                            {
                              product.color && product.color.map(color => (
                                <li className='color' style={{backgroundColor: `${color}`}} key={color}></li>
                              ))
                            }
                            
                          </ul>
                        </div>
                        <div className="row">
                          <span>Sizes: </span>
                          <ul>
                            {
                              product.size && product.size.map(size => (
                                <li className='size' key={size}>{size}</li>
                              ))
                            }
                          </ul>
                        </div>
                        <div className="row">
                          <p className="desc">
                            {product.desc}
                          </p>
                        </div>
                        <div className="row">
                          <button onClick={handleOpenUpdate}>Update Product</button>
                        </div>
                      </div>

                

                </div>

              </div>

              {reviews.length > 0 &&<div className="reviews">
                <span className="heading">Product Reviews</span>
                <div className="wrapper">
                  

                  <div className="list">
                    {reviews.length > 0 ? reviews.map((review)=> (
                      <Review key={review._id} review={review}/>
                    ))
                    : <span className="noRewiewsText">
                      No reviews for this product
                    </span>
                  
                    }
                    
                  </div>
                </div>
              </div>}
              
            </div>


            <div className={openUpdate? "update active" : "update "}>

              <span className='close' onClick={() => {setOpenUpdate(false)}}><CancelIcon className='icon'/></span>
              <span className="heading">Update Details</span>

              <form action="">
                  <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input id='name' name="title" type="text" defaultValue={product.title} placeholder={product.title} onChange={handleInputs}/>
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="price">Price:</label>
                    <input id='price' name="ptice"  defaultValue={product.price} type="number" placeholder={product.price} onChange={handleInputs}/>
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="categories">Categories:</label>
                    <div className="group" id='categories'>
                        <div className="item">
                            <label htmlFor="formal">formal:</label>
                            <input type="checkbox" id='cat' value="formal" onChange={handleCat}/>
                        </div>
                        <div className="item">
                            <label htmlFor="kids">kids:</label>
                            <input type="checkbox" id='cat' value="kids" onChange={handleCat}/>
                        </div>
                        <div className="item">
                            <label htmlFor="indoor">indoor:</label>
                            <input type="checkbox" id='cat' value="indoor" onChange={handleCat}/>
                        </div>
                        <div className="item">
                            <label htmlFor="sport">sport:</label>
                            <input type="checkbox" id='cat' value="sport" onChange={handleCat}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">boots:</label>
                            <input type="checkbox" id='cat' value="boots" onChange={handleCat}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">summer:</label>
                            <input type="checkbox" id='cat' value="summer" onChange={handleCat}/>
                        </div>
                    </div>
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="sizes">Sizes:</label>
                    <div className="group" id='sizes'>
                        <div className="item">
                            <label htmlFor="formal">kids1:</label>
                            <input type="checkbox" id='size' value="K1" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">kids2:</label>
                            <input type="checkbox" id='size' value="K2" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">kids3:</label>
                            <input type="checkbox" id='size' value="K3" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">kids4:</label>
                            <input type="checkbox" id='size' value="K4" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">kids5:</label>
                            <input type="checkbox" id='size' value="K5" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">kids6:</label>
                            <input type="checkbox" id='size' value="K6" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">kids7:</label>
                            <input type="checkbox" id='size' value="K7" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult1:</label>
                            <input type="checkbox" id='size' value="A1" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult2:</label>
                            <input type="checkbox" id='size' value="A2" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult3:</label>
                            <input type="checkbox" id='size' value="A3" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult4:</label>
                            <input type="checkbox" id='size' value="A4" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult5:</label>
                            <input type="checkbox" id='size' value="A5" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult6:</label>
                            <input type="checkbox" id='size' value="A6" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult7:</label>
                            <input type="checkbox" id='size' value="A7" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult8:</label>
                            <input type="checkbox" id='size' value="A8" onChange={handleSize}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">Adult9:</label>
                            <input type="checkbox" id='size' value="A9" onChange={handleSize}/>
                        </div>
                        
                    </div>
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="colors">Colors:</label>
                    <input id='colors' type="text" name="color" placeholder={product.color} onChange={handleColors}/>
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="desc">Description</label>
                    <textarea id='desc' name="desc" placeholder={product.desc} onChange={handleInputs}></textarea>
                  </div>
                  <div className="inputGroup ">
                    <label className='file' htmlFor="image">Upload File: <UploadFileIcon className='icon'/></label>
                    <input id='image' type="file" placeholder='File' style={{display: "none"}}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    { updateProductProgress === 0 ? " ": updateProductProgress < 100 ? <span className="progress">{updateProductProgressMessage + " " + updateProductProgress} %</span> : <span className="progress done">Success... {updateProductProgress} %</span>}
                  </div>
                  

                  {
                    file && 
                    <div className="inputGroup">
                      {
                        updateProductProgress === 0 && 
                        (
                          <div className="image">
                            <img src={URL.createObjectURL(file)} alt="" />
                          </div>
                        ) 

                      }
                    </div>
                  }

                  <div className="inputGroup">
                    
                      <button onClick={handleSubmit}>Update</button>
                  </div>
                  
                  
                  
                    
                  
              </form>
            </div>
            
            
          </div>

        }
    </div>
  )
}

export default Product