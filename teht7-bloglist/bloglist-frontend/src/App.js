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
import { Form, Button, Navbar, Nav } from 'react-bootstrap'

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
      dispatch(setNotification(`${username} logged in`, 5))
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
          <Button variant='primary' onClick={() => setCreateVisible(true)} id="add-button">Add blog</Button>
        </div>
        <div className='container' style={showWhenVisible}>
          <BlogForm handleSubmit={handleCreate} />
          <Button variant='warning' onClick={() => setCreateVisible(false)}>Cancel</Button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div className='container'>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>
              Username:
            </Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Password:
            </Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant='primary' type="submit" id="login-button">login</Button>
          </Form.Group>
        </form>
      </div>
    )
  }

  return (
    <div className='container'>
      <div>
        <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href="#" as='span'>
                <Link to='/'>[ B L O G S ]</Link>&nbsp;
              </Nav.Link>
              <Nav.Link href="#" as='span'>
                <Link to='/users'>[ U S E R S ]</Link>&nbsp;
              </Nav.Link>
              <Nav.Link href="#" as='span'>
                <form onSubmit={handleLogout}>
                  {user.name} is logged in&nbsp;
                  <Button variant='dark' size='sm' type="submit">logout</Button>
                </form>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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