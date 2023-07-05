import React, { useEffect, useRef, useState } from 'react';
import "./messages.scss";
import Topbar from '../../components/topbar/Topbar';
import { EmailOutlined } from '@mui/icons-material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Prompt from '../../components/prompt/Prompt';

const Messages = () => {
    const [replyOpen, setReplyOpen] = useState(false);
    const [openPrompt, setOpenPrompt] = useState(false)
    const [mainWidth, setMainWidth] = useState(0)
    const ref = useRef();

    useEffect(() => {
        const width = ref.current.offsetWidth;
        setMainWidth(width);
    }, [openPrompt])

    const message = "Are you sure you want to delete this message?"
  return (
    <div className='messages' ref={ref}>
        <Topbar title="Messages" message="Hi!, please look at some messages from our customers"/>

        <div className="container">
            <button onClick={() => setOpenPrompt(true)}>
                Open Prompt
            </button>

            {
               openPrompt && <Prompt setOpenPrompt={setOpenPrompt} message={message} containerWidth={mainWidth}/>
            }
        </div>
    </div>
  )
}

export default Messages