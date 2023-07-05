import React, { useEffect, useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import "./viewStaff.scss";
import Topbar from '../../components/topbar/Topbar';
import { userRequest } from '../../requestMethod';
import { useParams } from 'react-router-dom';

const ViewStaff = () => {

    const [user, setUser] = useState([]);

    const userId = useParams().id

    useEffect(() => {

        const fetchUser = async() => {

            try {
                const res = await userRequest.get(`users/find/${userId}`);
                setUser(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])

    console.log(user)
  return (
    <div className='viewStaff'>
        <Topbar 
            title="View Staff"
            message="Hi!, below are the details of the requested staff"
            
        />

<div className="container">
            {/* <span className="heading">Staff Profile</span> */}

            <div className="wrapper">

            
                <div className="left">
                    <div className="top">
                        <img src={user.image} alt="" />

                        <div className="info">
                            <span className="name">{user.firstname} {user.lastname}</span>
                            <span className="role">Admin</span>
                            <span className="country"><PublicOutlinedIcon className='icon' />{user.country}</span>
                        
                            <span className="title">shipping Address</span>
                            
                            <span className="address">
                                <LocationOnOutlinedIcon className='icon'/> {user.streetAddress} {user.city} {user.state} {user.zip}
                            </span>
                        </div>
                        
                    </div>

                    
                </div>

                <div className="right">
                    <div className="wrapper">
                        <span className="title">Contact this Staff</span>
                        <span className="item"><PhoneInTalkOutlinedIcon className='icon' /> {user.phone}</span>
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
        </div>
    </div>
  )
}

export default ViewStaff