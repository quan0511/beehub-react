import ReactDOM from 'react-dom'
import './ChatBox.css'
import { useDispatch, useSelector } from 'react-redux';
import { closeChat, isOpen, userId } from '../messages/chatboxSlice';
import { CgClose } from 'react-icons/cg';
import { Send } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useCreateMessageForUserMutation, useGetMessagesForUserQuery } from '../messages/messageApiSlice';
import { selectCurrentUser } from '../auth/authSlice';
import { useState } from 'react';

function ChatBox() {
    const user = useSelector(selectCurrentUser)
    const open = useSelector(isOpen)
    const chatUserId = useSelector(userId)

    const { data: messages } = useGetMessagesForUserQuery(chatUserId, { skip: chatUserId === '' })

    const [sendMessage] = useCreateMessageForUserMutation()

    const [chatInput, setChatInput] = useState('')

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeChat())
    }

    const submit = (e) => {
        sendMessage({ recipientId: chatUserId, content: chatInput})
        setChatInput('')
        e.preventDefault()
    }


    if (!open) return

    return ReactDOM.createPortal(
        <div className={`chatbox`}>
            <div className="chatbox-container">
                <div className="chatbox-title">
                    <div className="avatar-wrapper">
                        <img className="avatar" src="https://mythemestore.com/beehive-preview/wp-content/uploads/group-avatars/6/5e2cce5312454-bpthumb.jpg" alt="avatar" />
                    </div>
                    <div className="chat-name">Abc</div>
                    <div onClick={handleClose} className='close-button'><CgClose /></div>
                </div>

                <div className="chatbox-message-list">
                    <div className="content">
                        <ul className="chat-list">
                            <li className="message--self">
                                <div className="message-block">
                                    {messages && messages.map(m => m.creatorId == user.id ?
                                        <div key={m.id} className="messages">
                                            <div className="message">{m.messageBody}</div>
                                        </div>
                                        :
                                        <div key={m.id} className="messages align-items-start">
                                            <div className="message bg-secondary-subtle">{m.messageBody}</div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <form onSubmit={submit} className="chatbox-inputarea">
                    <input value={chatInput} onChange={e => setChatInput(e.target.value)} className="chatbox-input" placeholder='Write your message' />
                    <Button variant='transparent' type="submit"><Send /></Button>
                </form>
            </div>
        </div>
        , document.getElementById('beehubChatbox'));
}

export default ChatBox;