import React from 'react'
import { useParams } from 'react-router'

const Anecdote = ({ anecdotes }) => {
  console.log(anecdotes)
  const id = useParams().id
  console.log(id)
  const anecdote = anecdotes.find(n => n.id === id)
  console.log(anecdote)
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>
        has {anecdote.votes} votes<br />
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  )
}

export default Anecdote