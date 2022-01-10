import { Avatar } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import db from '../firebase'
import '../styles/SidebarChat.scss'
import firebase from 'firebase/compat/app'

const SidebarChat = ({ addNewChat, name, id }) => {
  const [seed, setSeed] = useState(0)
  const [lastMessage, setLastMessage] = useState('')

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setLastMessage(snapshot.docs.map((doc) => doc.data()))
        })
    }
  }, [id])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000))
  }, [])

  const createChat = () => {
    const roomName = prompt('Please enter a chat room name')

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms:${id}`}>
      <div className='sidebar-chat'>
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          alt='A'
        />
        <div className='sidebar-chat-info'>
          <h2>{name}</h2>
          <p>{lastMessage[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebar-chat'>
      <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat
