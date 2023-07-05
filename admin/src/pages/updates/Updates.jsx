import React from 'react';
import "./updates.scss";
import Topbar from '../../components/topbar/Topbar';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Updates = () => {
  return (
    <div className='updates'>
        <Topbar title="Updates" message="Hi, below you'll find all updates about Footwear"/>

        <div className="container">
                <div className="shoeList">
                    <table>
                        <thead>
                            <td className='num'>#</td>
                            <td>Type</td>
                            <td>date</td>
                            <td>Message</td>
                            <td>Action</td>
                        </thead>

                        <tr className='white'>
                            <td>
                                <div className="wrapper">
                                    1
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="type">Product Added</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="date">2023-02-23</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <p className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    </p>
                                </div>
                            </td>
                           


                            <td>
                                <div className="wrapper actions">
                                    <span><PreviewOutlinedIcon className='icon'/></span>
                                    <span><DeleteOutlineOutlinedIcon className='icon'/></span>
                                </div>
                            </td>
                        </tr>
                        <tr className=''>
                            <td>
                                <div className="wrapper">
                                    1
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="type">Order Added</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="date">2023-02-23</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <p className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    </p>
                                </div>
                            </td>
                           


                            <td>
                                <div className="wrapper actions">
                                    <span><PreviewOutlinedIcon className='icon'/></span>
                                    <span><DeleteOutlineOutlinedIcon className='icon'/></span>
                                </div>
                            </td>
                        </tr>
                        <tr className='white'>
                            <td>
                                <div className="wrapper">
                                    1
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="type">Product Added</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="date">2023-02-23</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <p className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    </p>
                                </div>
                            </td>
                           


                            <td>
                                <div className="wrapper actions">
                                    <span><PreviewOutlinedIcon className='icon'/></span>
                                    <span><DeleteOutlineOutlinedIcon className='icon'/></span>
                                </div>
                            </td>
                        </tr>
                        <tr className=''>
                            <td>
                                <div className="wrapper">
                                    1
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="type">Order Added</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="date">2023-02-23</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <p className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    </p>
                                </div>
                            </td>
                           


                            <td>
                                <div className="wrapper actions">
                                    <span><PreviewOutlinedIcon className='icon'/></span>
                                    <span><DeleteOutlineOutlinedIcon className='icon'/></span>
                                </div>
                            </td>
                        </tr>
                        <tr className='white'>
                            <td>
                                <div className="wrapper">
                                    1
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="type">Product Added</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="date">2023-02-23</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <p className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    </p>
                                </div>
                            </td>
                           


                            <td>
                                <div className="wrapper actions">
                                    <span><PreviewOutlinedIcon className='icon'/></span>
                                    <span><DeleteOutlineOutlinedIcon className='icon'/></span>
                                </div>
                            </td>
                        </tr>
                        <tr className=''>
                            <td>
                                <div className="wrapper">
                                    1
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="type">Order Added</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <span className="date">2023-02-23</span>
                                </div>
                            </td>
                            <td>
                                <div className="wrapper ">

                                    <p className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    </p>
                                </div>
                            </td>
                           


                            <td>
                                <div className="wrapper actions">
                                    <span><PreviewOutlinedIcon className='icon'/></span>
                                    <span><DeleteOutlineOutlinedIcon className='icon'/></span>
                                </div>
                            </td>
                        </tr>



                    </table>
                </div>
            </div>
    </div>
  )
}

export default Updates