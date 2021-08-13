import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (anecdote) => {
  console.log(anecdote)
  const newVotes = anecdote.votes + 1
  const updatedAnecdote = {
    ...anecdote,
    votes: newVotes
  }
  console.log(updatedAnecdote)
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return response.data
}

export default { 
  getAll,
  createNew,
  update,
}