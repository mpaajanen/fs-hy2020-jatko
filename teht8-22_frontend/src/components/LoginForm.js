import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({show, setToken, setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [ login, result ] = useMutation(LOGIN, {
    
  })
  
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('gql-library-user-token', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])
  
  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
    setPage('authors')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username: <input 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password: <input 
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm