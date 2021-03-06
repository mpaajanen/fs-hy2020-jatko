import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    const anecdoteVoted = anecdotes.find(n => n.id === id)
    dispatch(voteAnecdote(anecdoteVoted))
    dispatch(setNotification(`You voted "${anecdoteVoted.content}"`, 5))
    // dispatch(notificationOnVoted(id, anecdotes))
    // setTimeout(() => {
    //   dispatch(notificationOff())
    // }, 5000)
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