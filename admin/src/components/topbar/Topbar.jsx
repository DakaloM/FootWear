import React from 'react';
import "./topbar.scss";
import { Language, LanguageOutlined, NotificationsNone, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Topbar = ({title, message, action, link}) => {
  return (
    <div className='topbar'>
        <div className="topbarContainer">
          <div className="wrapper">
            <h1>{title}</h1>
            <span>{message}</span>
            {action && (
              <Link className="link" to={link}><span><AddOutlinedIcon className='icon'/>{action}</span></Link>
            )}
          </div>
        </div>
    </div>
  )
}

export default Topbar