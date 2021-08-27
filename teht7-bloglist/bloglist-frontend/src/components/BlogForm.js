import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
// import PropTypes from 'prop-types'

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
      <h2>Add new blog</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row}>
          <Col sm={1}>
            <Form.Label>
            Title:
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={handleTitleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={1}>
            <Form.Label>
            Author:
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={handleAuthorChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={1}>
            <Form.Label>
            Url:
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={handleUrlChange}
            />
          </Col>
        </Form.Group>
        <Button variant='primary' type="submit" id="create-button">Create</Button>
      </Form>
    </div>
  )
}

// BlogForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   author: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   handleTitleChange: PropTypes.func.isRequired,
//   handleAuthorChange: PropTypes.func.isRequired,
//   handleUrlChange: PropTypes.func.isRequired
// }

export default BlogForm