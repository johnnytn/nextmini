import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
    /* storageBucket: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY */
  })
}

export default firebase
