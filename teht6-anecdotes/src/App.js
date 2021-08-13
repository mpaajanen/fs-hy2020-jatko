import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
    .getAll()
    .then(anecdotes =>
      // store.dispatch(initializeAnecdotes(anecdotes))
      dispatch(initializeAnecdotes(anecdotes))
      )
    }, [dispatch])
      

  return (
    <div>
      <AnecdoteForm />
      <Filter />
      <Notification />
      <AnecdoteList />
    </div>
  )
}

export default App