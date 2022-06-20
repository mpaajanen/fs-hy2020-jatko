import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BORN } from '../queries'
import Select from 'react-select'

const EditAuthor = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  
  const options = props.authors.map(a => {
    const option = {value: a.name, label: a.name}
    return option
  })

  const [ editAuthor ] = useMutation(SET_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  const setBirthyear = async (event) => {
    event.preventDefault()
    editAuthor( { variables: {author: author.value, born: parseInt(born)} } )

    setAuthor('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={setBirthyear}>
      <div>
        <Select defaultValue={author} onChange={setAuthor} options={options} />
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