import React, { useEffect, useState } from 'react';
import "./profile.scss";
import Topbar from '../../components/topbar/Topbar';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Face } from '@mui/icons-material';
import { accessToken, userRequest } from '../../requestMethod';
import { useParams } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

const Profile = () => {

    const [user, setUser] = useState([])
    const [address, setAddress] = useState([])
    const [openUpdate, setOpenUpdate] = useState(false);
    const [file, setFile] = useState()
    const [success, setSuccess] = useState(false)
    const [overFlowHeight, setoverFlowHeight] = useState(0)
    const [inputs, setInputs] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        image: user.image,
        streetAddress: user.streetAddress,
        city: user.city,
        state: user.state,
        zip: user.zip,
        country: user.country,
        accessToken: accessToken
    });

    const userId = useParams().id

    console.log(userId)

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.id] : e.target.value}));
    }

    const handleOpenUpdate = () => {
        setoverFlowHeight("fit-content");
        setOpenUpdate(true)
    }
    const handleCloseUpdate = () => {
        setOpenUpdate(false)
        if(openUpdate === false) {

            window.setTimeout(() =>{
                setoverFlowHeight(0)
            }, 3000)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userUpdates = {
            firstname: inputs.firstname,
            lastname: inputs.lastname,
            phone: inputs.phone,
            streetAddress: inputs.streetAddress,
            city: inputs.city,
            state: inputs.state,
            country: inputs.country,
            zip: inputs.zip
        }

        try {
            const res = await userRequest.put(`users/`, userUpdates)
            
            // dispatch(updateUser(res.data))
            // setSuccess(true)
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }
       


    }

    useEffect(() => {
        
        const fetchUser = async () => {

            try {
                const res = await userRequest.get(`users/find/${userId}`)
                setUser(res.data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchUser();
    },[])


    console.log(file)

  return (
    <div className='profile'>
        <Topbar title="Profile" message="Hi! down below are your profile details"/>

        <div className="container">
            {/* <span className="heading">Staff Profile</span> */}

            <div className="wrapper">

                
                <div className="left">
                    <div className="top">
                        <img src={user? user.image : "./img/avatar.jpg"} alt="" />

                        <div className="info">
                            <span className="name">{user.firstname} {user.lastname}</span>
                            <span className="role">{user.isAdmin? "Admin" : "Customer"}</span>
                            <span className="country"><PublicOutlinedIcon className='icon' />
                                {user? user.country : "not specified"}
                            </span>
                        
                            <span className="title">shipping Address</span>
                            
                            <span className="address">
                                <LocationOnOutlinedIcon className='icon'/> 
                                {user? user.streetAddress + " " + user.city  + " " + user.state + " " + user.zip
                                :"Not specified"}
                            </span>
                        </div>
                        
                    </div>

                    
                </div>

                <div className="right">
                    <div className="wrapper">
                        <span className="title">Contact this Staff</span>
                        <span className="item"><PhoneInTalkOutlinedIcon className='icon' />{user.phone}</span>
                        <span className="item"><EmailOutlinedIcon className='icon' /> {user.email}</span>
                        <span className="item icons">
                            <span><WhatsAppIcon className='icon' /></span>
                            <span><TwitterIcon className='icon' /></span>
                            <span><LinkedInIcon className='icon' /></span>
                            <span><InstagramIcon className='icon' /></span>
                        </span>
                    </div>
                </div>
            </div>

            <button onClick={handleOpenUpdate}>Update Profile</button>

            <div className="overFlowWrapper" style={{
                height: `${overFlowHeight}`
            }}>

            
                <div className={openUpdate? "formContainer active" : "formContainer"}>

                    <span className="close" onClick={handleCloseUpdate}><CancelIcon className='icon'/></span>

                    {success && <span className="message">Profile uptaded successfully!</span>}
                    <div className="contain">

                    
                        
                        <form action="" onChange={handleChange}>
                            
                            <div className="wrapper">
                                
                                <span className="title">Edit Personal Information</span>
                                <div className="formWrapper">
                                    <div className="inputGroup">
                                        <label htmlFor="firstname">First name:</label>
                                        <input type="text" id='firstname' placeholder={user.firstname} />
                                    </div>
                                    
                                    <div className="inputGroup">
                                        <label htmlFor="lastname">Last name:</label>
                                        <input type="text" id='lastname' placeholder={user.lastname} />
                                    </div>
                                    
                                    <div className="inputGroup">
                                        <label htmlFor="phone">Phone:</label>
                                        <input type="number" id='phone' placeholder={user.phone} />
                                    </div>
                                    <div className="inputGroup file">
                                        <label className="file" htmlFor="file">Change your profile picture: <UploadFileIcon  className='icon'/></label>
                                        <input type="file" id='file' placeholder='file'  style={{display: "none"}}
                                            onChange={e => setFile(e.target.files[0])}
                                        />
                                    </div>
                                    {   
                                        file && 
                                        <div className="image">
                                            <img src={URL.createObjectURL(file)} alt="" />
                                        </div>
                                    }
                                

                                    


                                </div>
                            </div>
                            
                                        
                            <div className="wrapper">
                                <span className="title">Edit Shipping Information</span>
                                <div className="formWrapper">
                                    <div className="inputGroup">
                                        <label htmlFor="streetAddress">Street address</label>
                                        <input type="text" id='streetAddress' placeholder={user.streetAddress} />
                                    </div>
                                    <div className="inputGroup">
                                        <label htmlFor="city">City:</label>
                                        <input type="text" id='city' placeholder={user.city} />
                                    </div>
                                    <div className="inputGroup">
                                        <label htmlFor="state">State:</label>
                                        <input type="state" id='state' placeholder={user.state} />
                                    </div>
                                    <div className="inputGroup">
                                        <label htmlFor="country">Country:</label>
                                        <input type="country" id='country' placeholder={user.country} />
                                    </div>
                                    <div className="inputGroup">
                                        <label htmlFor="zip">Zip code:</label>
                                        <input type="zip" id='zip' placeholder={user.zip} />
                                    </div>
                                    
                                    

                                    

                                

                                </div>
                            </div>

                            <button type='submit' onClick={handleUpdate}>Save</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile