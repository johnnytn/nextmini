import { createContext, useState } from 'react'
import firebase from '../lib/firebase'
import Router from 'next/router'
const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const signin = () => {
    try {
      setLoading(true)
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then((response) => {
          setUser(response.user)
          Router.push('/dashboard')
        })
    } finally {
      setLoading(false)
    }
  }
  const singout = () => {
    try {
      Router.push('/')
      return firebase
        .auth()
        .singout()
        .then(() => {
          setUser(null)
        })
    } finally {
      setLoading(false)
    }
  }
  return <AuthContext.Provider
    value={ {
      user,
      loading,
      signin,
      singout
    } }
  >{ children }
  </AuthContext.Provider>
}

export const AuthConsumer = AuthContext.AuthConsumer

export default AuthContext