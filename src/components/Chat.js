import { useEffect, useState } from 'react'
import '../styles/Chat.scss'
import { Avatar, Button, IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { authUser, setMessages, messagesRoom } from '../features/user/userSlice'
import firebase from 'firebase/compat/app'

const Chat = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const user = useSelector(authUser)
  const messages = useSelector(messagesRoom)

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name)
        })

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          //setMessages(snapshot.docs.map((doc) => doc.data()))
          dispatch(
            setMessages({
              messages: snapshot.docs.map((doc) => doc.data()),
            })
          )
        })
    }
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('')
  }

  return (
    <div className='chat'>
      <div className='chat-header'>
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}
          alt='A'
        />
        <div className='chat-header-info'>
          <h3>{roomName}</h3>
          <p>
            Last message sent at{' '}
            {`${new Date(
              messages[0]?.timestamp?.toDate()
            ).getUTCHours()} : ${new Date(messages[0]?.timestamp?.toDate())
              .getUTCMinutes()
              .toFixed(0)}`}
          </p>
        </div>
        <div className='chat-header-icons'>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat-body'>
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat-message ${
              message.name === user.displayName && 'chat-receiver'
            }`}
          >
            {message.message} <span className='name'>{message.name}</span>
            <span className='time'>
              {`${new Date(
                message.timestamp?.toDate()
              ).getUTCHours()} : ${new Date(message.timestamp?.toDate())
                .getUTCMinutes()
                .toFixed(0)}`}
            </span>
          </p>
        ))}
      </div>
      <div className='chat-footer'>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message...'
          />
          <Button disabled={!input} onClick={sendMessage} type='submit'>
            Send
          </Button>
        </form>
        <IconButton>
          <KeyboardVoiceOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
