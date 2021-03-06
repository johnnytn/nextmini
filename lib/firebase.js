import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  })
}
export const db = firebase.firestore()
export const addUser = async (user) => {
  await db.collection('users').add({
    uid: user.uid,
    email: user.email,
    name: user.name
  })
  return user
}

export const getUser = async (id) => {
  if (id) {
    const docRef = db.collection('users').where(`uid`, '==', id)
    const querySnapshot = await docRef.get()
    const data = querySnapshot?.docs[0]?.data()
    return data
  }
  return null
}
export const getOrAddUser = async (user) => {
  let u = await getUser(user.uid)
  if (!u) {
    u = await addUser(user)
  }
  return u
}
export const addMovie = async (movie, user) => {
  const docRef = await db.collection('movies').add({
    poster: movie.Poster,
    title: movie.Title,
    type: movie.Type,
    imdbID: movie.imdbID,
    userId: user.uid
  })
  return docRef
}
export const getMoviesByUser = async (id) => {
  try {
    if (id) {
      const docRef = db.collection('movies').where('userId', '==', id)
      const querySnapshot = await docRef.get()
      const movies = []
      querySnapshot.forEach((doc) => {
        const movie = {
          ...doc.data(),
          id: doc.id
        }
        movies.push(movie)
      })
      return movies
    }
    return []
  } catch (error) {
    console.log(`Error getting document:`, error)
    throw error
  }
}
export const getMovieById = async (id) => {
  try {
    if (id) {
      const docRef = db.collection('movies').where('imdbID', '==', id)
      const querySnapshot = await docRef.get()
      let movie = null
      querySnapshot.forEach((doc) => {
        movie = {
          ...doc.data(),
          id: doc.id
        }
      })
      return movie
    }
    return null
  } catch (error) {
    console.log(`Error getting document:`, error)
    throw error
  }
}
export const getOrAddMovie = async (movie, user) => {
  let m = await getMovieById(movie.imdbID)
  let wasAdded = false
  if (!m) {
    m = await addMovie(movie, user)
    wasAdded = true
  }
  return wasAdded
}
export const removeMovie = async (movie) => {
  try {
    if (movie) {
      const docRef = await db.collection('movies').doc(movie.id).delete()
      return docRef
    }
    return null
  } catch (error) {
    console.error(`Error getting document:`, error)
    throw error
  }
}

export default firebase
