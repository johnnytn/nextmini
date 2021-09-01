import { createContext, useState } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'
import firebase, { getOrAddUser } from '../lib/firebase'

const AuthContext = createContext()

const formatUser = async (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: user.za,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoUrl
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const setSession = (session) => {
    if (session) {
      cookie.set('nextmini-auth', session, {
        expires: 1
      })
    } else {
      cookie.remove('nextmini-auth')
    }
  }

  const handleUser = async (currentUser) => {
    if (currentUser) {
      const formatedUser = await formatUser(currentUser)
      setUser(formatedUser)
      // save to firestore
      // Router.push('/dashboard')
      // addUser(db, formatedUser)
      getOrAddUser(formatedUser)
      // console.lof
      setSession(true)
      return formatedUser
    }
    setUser(null)
    setSession(false)
    // Router.push('/')
    return null
  }

  const signinGitHub = async () => {
    try {
      setLoading(true)
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider())

      handleUser(response.user)

      /* .then((response) => {
        setUser(formatUser(response.user))
        Router.push('/dashboard')
      }) */
    } finally {
      setLoading(false)
    }
  }

  const signinGoogle = async () => {
    try {
      setLoading(true)
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())

      handleUser(response.user)
    } finally {
      setLoading(false)
    }
  }

  const signout = async () => {
    try {
      Router.push('/')
      await firebase.auth().signOut()
      handleUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signinGoogle,
        signinGitHub,
        signout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const { AuthConsumer } = AuthContext

export default AuthContext
