import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link,
  // useHistory,
} from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { addBlog, getBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/loginReducer'
import { getUsers } from './reducers/usersReducer'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    dispatch(getBlogs())
  }, [blogs])

  useEffect(() => {
    dispatch(getUsers())
  }, [users])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const blogsSorted = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
  }

  const handleCreate = (blogObject) => {
    dispatch(addBlog(blogObject))
    dispatch(setNotification(`new blog ${blogObject.title} by ${blogObject.author} added`, 5))
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)} id="add-button">add blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm handleSubmit={handleCreate} />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link to='/'>blogs</Link>&nbsp;
        <Link to='/users'>users</Link>&nbsp;
        {user.name} is logged in
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
        {blogForm()}
      </div>

      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <UserInfo users={users} />
        </Route>
        <Route path='/users'>
          <UserList users={users} />
        </Route>
        <Route path='/blogs/:id'>
          {/* <BlogInfo blogs={blogs} /> */}
          <BlogInfo />
        </Route>
        <Route path='/'>
          <BlogList blogs={blogsSorted} user={user} />
        </Route>
      </Switch>
    </div>
  )
}

export default App