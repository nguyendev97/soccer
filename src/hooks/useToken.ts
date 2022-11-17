
import { useState } from 'react'
// import jwtDecode from 'jwt-decode'
import { TOKEN_KEY } from 'config'

export interface UserProps {
  username: string
  balance: number
}

export default function useToken() {
  const getToken = () => {
    const tokenString = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : ''
    return tokenString
  }

  const [token, setToken] = useState(getToken())

  // const getParsedToken = (): UserProps | null => {
  //   if (token) {
  //     return jwtDecode(token || "")
  //   }
  //   return null
  // }

  const saveToken = (tokenString: string) => {
    localStorage.setItem(TOKEN_KEY, tokenString)
    setToken(tokenString)
  }

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  return {
    setToken: saveToken,
    removeToken,
    token,
    // getParsedToken
  }
}