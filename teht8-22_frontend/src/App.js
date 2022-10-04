import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultGenres = useQuery(ALL_GENRES)
  const client = useApolloClient()

  if (resultAuthors.loading || resultBooks.loading || resultGenres.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const loginlogout = () => {
    if (!token) {
      return (
          <button onClick={() => setPage('login')}>login</button>
      )
    }
    
    return (
      <button onClick={logout}>logout</button>
      )
    }
    
    return (
      <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {loginlogout()}
      </div>

      <Authors show={page === 'authors'} authors={resultAuthors.data.allAuthors} token={token} />
      <Books show={page === 'books'} books={resultBooks.data.allBooks} genres={resultGenres.data.allGenres} />
      {/* <Books show={page === 'books'} books={resultBooks.data.allBooks} /> */}
      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
