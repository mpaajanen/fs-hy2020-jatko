import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationOnAdded, notificationOff } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value =''

    const newAnecdote = await anecdoteService.createNew(anecdote)
    // console.log(newAnecdote)
    dispatch(addAnecdote(newAnecdote))
    dispatch(notificationOnAdded(anecdote))
    setTimeout(() => {
      dispatch(notificationOff())
    }, 5000)
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={add}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm