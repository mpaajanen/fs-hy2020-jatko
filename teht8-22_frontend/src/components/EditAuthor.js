import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BORN } from '../queries'

const EditAuthor = () => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(SET_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  const setBirthyear = async (event) => {
    event.preventDefault()
    editAuthor( { variables: {author, born: parseInt(born)} } )

    setAuthor('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={setBirthyear}>
      <div>
        author
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        born
        <input
          type="number"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <button type="submit">update author</button>
      </form>
      
    </div>
  )
}

export default EditAuthor