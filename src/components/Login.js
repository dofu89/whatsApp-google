import { Button } from '@mui/material'
import { auth, provider } from '../firebase'
import '../styles/Login.scss'
import { setUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const singIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.credential) {
          const token = result.credential.accessToken
          console.log(token)
          localStorage.setItem('token', token)
        }

        dispatch(setUser({ user: result.user }))
      })
      //.then((result) => dispatch(setUser({ user: result.user })))
      .catch((error) => alert(error.message))
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <img
          src='https://appsgeyser.com/geticon.php?widget=Whattsap_13312317&width=512'
          alt='whatsapp logo'
        />
        <h1>Sing in to WhatsApp</h1>
        <Button onClick={singIn}>Sing In With Google</Button>
      </div>
    </div>
  )
}

export default Login

//setUser({ user: result.user })
