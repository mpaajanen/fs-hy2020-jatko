import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    handleSubmit(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  const handleTitleChange = (event) => { setTitle(event.target.value) }
  const handleAuthorChange = (event) => { setAuthor(event.target.value) }
  const handleUrlChange = (event) => { setUrl(event.target.value) }

  return (
    <div>
      <h2>create new</h2>
      <div>
        <form onSubmit={handleCreate}>
          <div>
                    title:
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={handleTitleChange}
            />
          </div>
          <div>
                    author:
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
                    url:
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit" id="create-button">create</button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default BlogForm