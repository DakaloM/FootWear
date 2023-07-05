import React from 'react';
import "./addStaff.scss";
import Topbar from '../../components/topbar/Topbar';

const AddStaff = () => {
  return (
    <div className='addStaff'>
        <Topbar title="Add new staff" message="Hi!, here you can add details of the new staff member"/>
    </div>
  )
}

export default AddStaff