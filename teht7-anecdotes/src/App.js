import React, { useState } from 'react'
import {
  Switch, Route, Link,
  useRouteMatch
} from 'react-router-dom'
import Footer from './components/Footer'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Home from './components/Home'

const App = () => {
  const padding = {
    paddingRight: 5
  }

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/createnew'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      <Switch>
        <Route path='/createnew'>
          <CreateNew />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <Home anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App