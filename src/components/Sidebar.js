import { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import '../styles/Sidebar.scss'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SidebarChat from './SidebarChat'
import db, { provider } from '../firebase'
import { authUser, setUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signOut, unlink } from 'firebase/auth'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Sidebar = () => {
  const [rooms, setRooms] = useState([])
  //const user = useAppSelector(authUser)
  const user = useSelector(authUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      })

    return () => {
      unsubscribe()
    }
  }, [])

  const logOut = (e) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Do you wanna logout',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            e.preventDefault()
            console.log(user)
            unlink(getAuth.currentUser, provider.id).then(() =>
              console.log('unlinked')
            )
            signOut(getAuth()).then(() => dispatch(setUser({ user: null })))
            localStorage.removeItem('token')
            //dispatch(setUser({ user: null }))
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    })
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Avatar src={user?.photoURL} alt='A' />
        <div className='sidebar-right'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={logOut}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar-search'>
        <div className='sidebar-search-container'>
          <SearchOutlinedIcon />
          <input type='text' placeholder='Search for chat room' />
        </div>
      </div>
      <div className='sidebar-chat-rooms'>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
