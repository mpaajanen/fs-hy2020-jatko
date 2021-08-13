import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationOff, notificationOnVoted } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const showAll = filter === null ? true : false
  const anecdotesSorted = [...anecdotes].sort((a, b) => {
    return b.votes - a.votes
  })
  const anecdotesToShow = showAll ? anecdotesSorted : [...anecdotesSorted].filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  // console.log(anecdotesToShow)

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(notificationOnVoted(id, anecdotes))
    setTimeout(() => {
      dispatch(notificationOff())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList