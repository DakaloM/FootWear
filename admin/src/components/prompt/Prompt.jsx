import React from 'react';
import "./prompt.scss";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Prompt = ({setOpenPrompt, containerWidth, message, actionId, action}) => {
    
    const handleAction = () => {
        action(actionId)
        setOpenPrompt(false)
    }
  return (
    <div className='prompt'>

        <div className="promptContainer" style={{
            left: `calc(100vw - ${containerWidth}px)`
        }}>

            <p className="message">{message}</p>

            <div className="actions">
                <button onClick={() => setOpenPrompt(false)} className="cancel">
                    Cancel
                </button>
                <button onClick={handleAction} className="proceed">
                    Yes
                </button>
            </div>
        </div>
    </div>
  )
}

export default Prompt