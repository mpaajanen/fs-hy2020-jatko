import React from 'react'
import Comment from './Comment'

const Comments = ({ comments }) => {
  return (
    <div>
      <h2>comments</h2>
      {comments.map(comment =>
        <Comment key={comment.id} comment={comment.comment} />
      )}

    </div>
  )
}

export default Comments