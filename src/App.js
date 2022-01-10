import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.scss'
import Chat from './components/Chat'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import { useAppSelector } from '../src/app/hooks'
import { authUser, setUser } from '../src/features/user/userSlice'
import { auth } from '../src/firebase'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const user = useAppSelector(authUser)
  console.log('USER: ', user)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(setUser({ user: user }))
    })
  }, [])

  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <div className='app-body'>
          <Router>
            <Routes>
              <Route
                path='*'
                element={
                  <>
                    <Sidebar />
                    <Routes>
                      <Route path='/rooms::roomId' element={<Chat />} />
                    </Routes>
                  </>
                }
              ></Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
