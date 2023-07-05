import React, { useEffect } from 'react'
import "./login.scss";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useNavigate } from 'react-router-dom';
import { logout, loginStart, loginFailure, loginSuccess } from '../../redux/userSlice';
import { publicRequest } from '../../requestMethod';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    
    

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch(loginStart({user: {username, password}}))
        try {
            const res = await publicRequest.post('auth/login', {username, password})
            const user = res.data
            dispatch(loginSuccess(user))
            if(user.isAdmin === true) {
                navigate("/")
            }else {
                dispatch(logout(user))
                setError(true)
                setErrorMessage("You do not have access to this page")
            }
            
        } catch (error) {
            dispatch(loginFailure())
            setError(true)
            setErrorMessage("Invalid Login credentials")
        }
        
    }

    
  
    return (
        <div className='login'>
            <h1>Login</h1>
            <p>Fill the form below with your Login credentials</p>

            <form className="loginForm">
                <div className="inputGroup">
                    <label htmlFor="username">Username:</label>
                    <input id='username' type="text" placeholder='jack123' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                </div>
                
                <div className="inputGroup">

                    <label htmlFor="password">Password:</label>
                    <input id='password' type="password" placeholder='*****' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                
                </div>
                <button onClick={handleClick}>Login</button>

                {error && (
                    <span className="error">{errorMessage}</span>
                )}
                
            </form>
        </div>
    )
}

export default Login