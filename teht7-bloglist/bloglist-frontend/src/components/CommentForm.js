import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const CommentForm = ({ createComment }) => {
  const id = useParams().id
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const commentObject = {
      comment: comment,
      blog: id
    }
    createComment(commentObject)
    setComment('')

  }

  const handleCommentChange = (event) => { setComment(event.target.value) }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id="comment"
              type="text"
              value={comment}
              name="Comment"
              onChange={handleCommentChange}
            />
          </div>
          <button type="submit" id="create-button">add comment</button>
        </form>
      </div>
    </div>
  )
}

export default CommentForm