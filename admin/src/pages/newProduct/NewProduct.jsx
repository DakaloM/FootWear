import { Publish } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import "./newProduct.scss";
import Topbar from '../../components/topbar/Topbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import { userRequest } from '../../requestMethod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';
import Loading from '../../components/loading/Loading';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => { 

    const [file, setFile] = useState("")
    const [categories, setCategories] = useState([])
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState("")
    const [loading, setLoading] = useState(false)
    const [priceInputError, setPriceInputError] = useState(false)
    const [nameInputError, setNameInputError] = useState(false)
    const [descInputError, setDescInputError] = useState(false)
    const [sizeInputError, setSizeInputError] = useState(false)
    const [fileInputError, setFileInputError] = useState(false)
    const [colorInputError, setColorInputError] = useState(false)
    const [CategoriesInputError, setCategoriesInputError] = useState(false)

    const navigate = useNavigate();


    const seeResults = () => {
        window.setTimeout(3500, () => {
            navigate("/products")
        })
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

    const handleNameChage = (e) => {
        if(e.target.value === ""){
            setNameInputError(true)
        } else {
            setName(e.target.value)
        }
    }
    const handleFileInput = (e) => {
        if(e.target.files.length > 0){
            setFile(e.target.files[0])
        } else {
            setFileInputError(true)
        }
    }
    const handleDescChage = (e) => {
        if(e.target.value === ""){
            setDescInputError(true)
        } else {
            setDesc(e.target.value)
        }
    }



    
    const handlePrice = (e) => {
        if(e.target.value > 0) {

            setPrice(e.target.value)
        } else {
            setPriceInputError(true)
        }
    }

    useEffect(() => {

    })

    const handleCat = (e) => {
        let array = []
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }

        if(array.length > 0) {

            setCategories(array)
        } else {
            setCategoriesInputError(true)
        }

        
    }
    const handleSize = (e) => {
        let array = []
        var checkboxes = document.querySelectorAll('#size:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if(array.length > 0) {

            setSize(array)
        } else {
            setSizeInputError(true)
        }

          
        
    }
    const handleColors = (e) => {
        if(e.target.value === ''){
            setColorInputError(true)
        } else {

            setColor(e.target.value.split(","))
        }
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(price <= 0){
            console.log("Price must be greater than zero")
            setPriceInputError(true)
        }else if(name === ""){
            console.log("Name is missing")
            setPriceInputError(true)
        }
        else if(categories.length <= 0){
            console.log("category is missing")
            setCategoriesInputError(true)
        }
        else if(size.length <= 0){
            console.log("size is missing")
            setSizeInputError(true)
        }
        else if(desc === ""){
            console.log("Desc is missing")
            setDescInputError(true)
        }
        else if(file === false){
            console.log("File uis missing")
            setFileInputError(true)
        }
        else if(color === ""){
            console.log("Color is missing")
            setColorInputError(true)
        }
        else {

        

            const fileName = new Date().getTime() + file.name
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            setLoading(true)
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
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
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

                    const product = {title: name, price, desc, categories, size, color, image: downloadURL};
                    try {
                        const res = await userRequest.post("products", product);
                        console.log(res.data)
                        setLoading(false)
                        notify("success", "Product added successfully")
                        navigate("/products")
                    } catch (error) {
                        const res = (error.response.data)
                        console.log(res)
                        setLoading(false)
                        notify("error",`Error! ${res}`)
                    }
                });
            }
            );

        }
        
    }


 console.log(file? "True": "False")
    
  return (
    <div className='newProduct'>
        <ToastContainer />
        <Topbar title="Add new product" message="Hi, please use the form below top add new product"/>

        <div className="container">

            <span className="heading">Create new Product</span>

            <form action="">
                <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name='title' placeholder='Nike Presto' onChange={handleNameChage}/>
                    {nameInputError === true ? <span className="priceError">This field is required*</span> : ""}
                </div>
                <div className="inputGroup">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name='price' placeholder='50.00' onChange={handlePrice}/>
                    {priceInputError === true ? <span className="priceError">Price cannot be zero or less*</span> : ""}
                </div>
                <div className="inputGroup">
                    <label htmlFor="categories">Categories:</label>
                    <div className="group" id='categories'>
                        <div className="item">
                            <label htmlFor="formal">formal:</label>
                            <input type="checkbox" id='cat' value="formal" onChange={handleCat}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">kids:</label>
                            <input type="checkbox" id='cat' value="kids" onChange={handleCat}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">indoor:</label>
                            <input type="checkbox" id='cat' value="indoor" onChange={handleCat}/>
                        </div>
                        <div className="item">
                            <label htmlFor="formal">sport:</label>
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
                    {CategoriesInputError === true ? <span className="priceError">This field is required*</span> : ""}
                </div>
                <div className="inputGroup">
                    <label htmlFor="categories">Sizes:</label>
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
                    {sizeInputError === true ? <span className="priceError">This field is required*</span> : ""}
                </div>
                <div className="inputGroup">
                    <label htmlFor="colors">Colors</label>
                    <input type="text" id="colors" placeholder='black, white, red' onChange={handleColors}/>
                    {colorInputError === true ? <span className="priceError">This field is required*</span> : ""}
                </div>
                <div className="inputGroup">
                    <label htmlFor="desc"></label>
                    <textarea id="desc" name='desc' cols="30" rows="10" placeholder='description' onChange={handleDescChage}></textarea>
                    {descInputError === true ? <span className="priceError">This field is required*</span> : ""}
                </div>

                <div className="fileInput">
                    <label htmlFor="file">Upload File<DriveFolderUploadOutlinedIcon className='icon'/></label>
                    <input type="file" id="file" style={{display: "none"}}
                        onChange={handleFileInput}
                    />
                    {fileInputError === true ? <span className="priceError">This field is required*</span> : ""}
                </div>
                <div className="inputGroup">
                    <button type='button' onClick={handleSubmit} disabled={loading} >
                       {loading === true ? <CircularProgress size={20} sx={{color: "#8363ac"}} /> : "Save"} 
                    </button>
                </div>
                
            </form>

            <div className="image">
                    {file && (
                        <img src={URL.createObjectURL(file)} alt="" />
                    )}
                </div>
        </div>
        
    </div>
  )
}

export default NewProduct