import ReactDOM from 'react-dom'
import './ChatBox.css'
import { useDispatch, useSelector } from 'react-redux';
import { closeChat, chat as chatSlice, isOpen } from '../messages/chatboxSlice';
import { CgClose } from 'react-icons/cg';
import { Send } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useCreateMessageForGroupMutation, useCreateMessageForUserMutation, useGetMessagesForGroupQuery, useGetMessagesForUserQuery } from '../messages/messageApiSlice';
import { selectCurrentUser } from '../auth/authSlice';
import { useEffect, useRef, useState } from 'react';
import { getAvatar } from '../utils/utils';
import { selectWs } from '../messages/websocketSlice';

function ChatBox() {
    const user = useSelector(selectCurrentUser)
    const open = useSelector(isOpen)
    const chat = useSelector(chatSlice)
    const dispatch = useDispatch()
    const ref = useRef()

    const { data: userMessages } = useGetMessagesForUserQuery(chat.id, { skip: chat.isGroup || chat.id == '' })
    const { data: groupMessages } = useGetMessagesForGroupQuery(chat.id, { skip: !chat.isGroup || chat.id == '' })

    const [sendUserMessage] = useCreateMessageForUserMutation()
    const [sendGroupMessage] = useCreateMessageForGroupMutation()

    const [messages, setMessages] = useState()
    const [chatInput, setChatInput] = useState('')

    const webSocket = useSelector(selectWs)

    useEffect(() => {
        if (!webSocket || !chat.id) return
        webSocket.onmessage = handleSocketMessage
    }, [webSocket, chat])

    const handleSocketMessage = (event) => {
        const socketMessage = JSON.parse(event.data)
        switch (socketMessage.type) {
            case 'RECEIVE_USER_MESSAGE':
                let userMessage = JSON.parse(socketMessage.data)
                if (userMessage.creatorId === chat.id && !chat.isGroup) {
                    setMessages(prevMsgs => [...prevMsgs, userMessage])
                    console.log('set message', userMessage)
                }
                break;
            case 'RECEIVE_GROUP_MESSAGE':
                let groupMessage = JSON.parse(socketMessage.data)
                if (messages != null && messages instanceof Array && groupMessage.recipientId === chat.id && chat.isGroup) {
                    setMessages(prevMsgs => [...prevMsgs, groupMessage])
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (!chat.id) return
        if (!chat.isGroup) {
            setMessages(userMessages)
        } else if (chat.isGroup) {
            setMessages(groupMessages)
        }
    }, [chat, userMessages, groupMessages])

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [messages])

    const handleClose = () => {
        dispatch(closeChat())
    }

    const submit = async (e) => {
        e.preventDefault()
        let message
        if (!chat.isGroup) {
            message = await sendUserMessage({ recipientId: chat.id, content: chatInput }).unwrap()
        } else if (chat.isGroup) {
            message = await sendGroupMessage({ recipientId: chat.id, content: chatInput }).unwrap()
        }
        webSocket.send(JSON.stringify({ type: chat.isGroup ? 'SEND_GROUP_MESSAGE' : 'SEND_USER_MESSAGE', data: JSON.stringify(message) }))
        setChatInput('')
    }

    if (!open) return

    return ReactDOM.createPortal(
        <div className="chatbox">
            <div className="chatbox-container">
                <div className="chatbox-title">
                    <div className="avatar-wrapper">
                        <img className="avatar" src={chat.avatar} alt="avatar" />
                    </div>
                    <div className="chat-name">{chat.name}</div>
                    <div onClick={handleClose} className='close-button'><CgClose /></div>
                </div>

                <div className="chatbox-message-list">
                    <div ref={ref} className="content">
                        <ul className="chat-list">
                            {messages && messages.map(m => m.creatorId == user.id ?
                                <li key={m.id} className="message--self">
                                    <div className="message-block">
                                        <div className="messages">
                                            <div className="message">{m.messageBody}</div>
                                        </div>
                                    </div>
                                </li>
                                :
                                <li key={m.id} className="message--self">
                                    <div className="message-block">
                                        {m.creatorAvatar &&
                                            <div className="small-avatar">
                                                <img className="avatar" src={getAvatar(m.creatorAvatar)} alt="avatar" />
                                            </div>}
                                        <div className="messages align-items-start">
                                            {chat.isGroup && <small>{m.creatorName}</small>}
                                            <div className="message bg-secondary-subtle">{m.messageBody}</div>
                                        </div>
                                    </div>
                                </li>
                            )}
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