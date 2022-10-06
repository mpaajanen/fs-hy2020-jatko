import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from './queries'
import Recommendations from './components/Recommendations'

export const updateCache = (cache, query, bookAdded) => {
  const uniqByTitle = (books) => {
    let seen = new Set()
    return books.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(bookAdded)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultGenres = useQuery(ALL_GENRES)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded  = subscriptionData.data.bookAdded
      window.alert(`${bookAdded.title} was added!`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(bookAdded)
        }
      })
    }
  })
  
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
        {token ? <button onClick={() => setPage('recommendations')}>recommendations</button> : null}
        {loginlogout()}
      </div>

      <Authors show={page === 'authors'} authors={resultAuthors.data.allAuthors} token={token} />
      <Books show={page === 'books'} books={resultBooks.data.allBooks} genres={resultGenres.data.allGenres} />
      {token ? <NewBook show={page === 'add'} /> : null }
      {token ? <Recommendations show={page === 'recommendations'} /> : null }
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
