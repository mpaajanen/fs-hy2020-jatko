import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = (user) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  // const filter = useSelector(state => state.filter)
  // const showAll = filter === null ? true : false
  // const anecdotesSorted = [...blogs].sort((a, b) => {
  //   return b.votes - a.votes
  // })
  // const anecdotesToShow = showAll ? anecdotesSorted : [...anecdotesSorted].filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  // console.log(anecdotesToShow)

  const likeBlog = (id) => {
    const blogLiked = blogs.find(n => n.id === id)
    dispatch(voteBlog(blogLiked))
    dispatch(setNotification(`${blogLiked.content} was liked`, 5))
  }

  // const likeAdder = (likedBlog, id) => {
  //   blogService
  //     .update(id, likedBlog)
  //     .then(() => {
  //       setBlogs(blogs.map(blog => blog.id === id ? likedBlog : blog))
  //     })
  //   dispatch(setNotification(`${likedBlog.title} was liked`, 5))
  // }

  const handleRemove = () => {
  // const handleRemove = (id) => {
    // if(window.confirm('Remove blog?')) {
    //   blogService
    //     .del(id)
    //     .then(() => {
    //       setBlogs(blogs.filter(blog => blog.id === id ? null : blog))
    //     })
    // }
  }

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} vote={likeBlog} handleRemove={handleRemove} user={user} />
      )}

      {/* <h2>Anecdotes</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <div>
            {blog.content}
          </div>
          <div>
            has {blog.votes}
            <button onClick={() => vote(blog.id)}>vote</button>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default BlogList