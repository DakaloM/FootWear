import React from 'react';
import "./newUser.scss";

const NewUser = () => {
  return (
    <div className='newUser'>
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
            <div className="newUserItem"> 
                <label>Username</label>
                <input type="text" placeholder='John'/>
            </div>
            <div className="newUserItem">
                <label>Full Name</label>
                <input type="text" placeholder='John Snow'/>
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input type="text" placeholder='JohnSnow@gmail.com'/>
            </div>
            <div className="newUserItem">
                <label>Password</label>
                <input type="password" placeholder='Password'/>
            </div>
            <div className="newUserItem">
                <label>Phone</label>
                <input type="password" placeholder='+27 072 134 4014'/>
            </div>
            <div className="newUserItem">
                <label>Gender</label>
                <div className="newUserGender">
                    <input type="radio" name="gender" id="male" value="male" />
                    <label for="male">Male</label>
                    <input type="radio" name="gender" id="female" value="female" />
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="other" value="other" />
                    <label for="other">Other</label>
                </div>
            </div>
            <div className="newUserItem">
                <label>Active</label>
                <select name='active' id='active'>
                    <option value="yes">Yes</option>
                    <option selected value="No">No</option>
                </select>
            </div>
            <div className="newUserItem">
                <label>Address</label>
                <textarea type="password" placeholder='75 small Str Johannesburg Gauteng SA'></textarea>
            </div>
            <div className="newUserItem">
                <button>Create</button>
                
            </div>
        </form>
    </div>
  )
}

export default NewUser