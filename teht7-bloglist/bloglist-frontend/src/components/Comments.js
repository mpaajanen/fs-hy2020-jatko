import React from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'

const Comments = ({ comments, createComment }) => {

  if(comments.length===0) {
    return (
      <div>
        <h2>comments</h2>
        No comments...
        <CommentForm createComment={createComment} />
      </div>
    )
  }

  return (
    <div>
      <h2>comments</h2>
      {comments.map(comment =>
        <Comment key={comment.id} comment={comment.comment} />
      )}
      <CommentForm createComment={createComment} />
    </div>
  )
}

export default Comments