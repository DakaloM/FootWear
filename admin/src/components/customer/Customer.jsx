import React, { useEffect, useState } from 'react';
import "./customer.scss";
import { userRequest } from '../../requestMethod';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Loading from '../loading/Loading';

const Customer = ({id, customer}) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchUser = async() => {
            setLoading(true);

            try {
                const res = await userRequest.get(`users/find/${id}`);
                setUser(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const UserCustomer = () => {
        return(

            loading ? <Loading />
            :
            <div className="wrapper customer">

                <img src={user.image} alt="" />

                <div className="info">
                    <span className="name">{user.firstname} {user.lastname}</span>
                    <span className="email"><EmailOutlinedIcon className='icon' />{user.email}</span>
                </div>
            </div>
    )
        
    }
    const User = () => {
        return(
                loading ? <Loading />
                :
                <div className='customer'>
                    {user && (
                        <div className="wrapper">
                            <span className="name">{user.firstname} {user.lastname}</span>
                            <span className="email">{user.email}</span>
                        </div>
                    )}
                </div>
        )

    }

    
  return (
        <>
            {
                customer? (
                    <UserCustomer />
                ): 
                (
                    <User />
                )
            }
        </>
  )
}

export default Customer