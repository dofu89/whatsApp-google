import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAvro63y60fRPIYdlMBNYKocjk6K2SNpLk',
  authDomain: 'whatsapp-dc7e2.firebaseapp.com',
  projectId: 'whatsapp-dc7e2',
  storageBucket: 'whatsapp-dc7e2.appspot.com',
  messagingSenderId: '159640971478',
  appId: '1:159640971478:web:b7e9ca09b6124de7b48177',
  measurementId: 'G-BQR0Q18BJE',
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export { auth, storage, provider }
export default db
