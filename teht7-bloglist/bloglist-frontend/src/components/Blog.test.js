import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const user = {
    username: 'mikkopaa',
    name: 'Mikko Paajanen'
  }

  const blog = {
    title: 'testing, testing, testing...',
    author: 'Crash Test Dummy',
    url: 'www.testing.net',
    likes: 5,
    user: {
      username: 'mikkopaa',
      name: 'Mikko Paajanen'
    }
  }

  const component = render(
    <Blog key={blog.id} blog={blog} user={user} />

  )

  const div = component.container.querySelector('.hidden')
  expect(div).toHaveTextContent(
    'testing, testing, testing...',
    'Crash Test Dummy'
  )

  const div2 = component.container.querySelector('.hidden')
  expect(div2).not.toHaveTextContent(
    'likes'
  )
})

test('clicking the button reveals additional info', async () => {
  const user = {
    username: 'mikkopaa',
    name: 'Mikko Paajanen'
  }

  const blog = {
    title: 'testing, testing, testing...',
    author: 'Crash Test Dummy',
    url: 'www.testing.net',
    likes: 5,
    user: {
      username: 'mikkopaa',
      name: 'Mikko Paajanen'
    }
  }

  const component = render(
    <Blog key={blog.id} blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.shown')
  expect(div).toHaveTextContent(
    'www.testing.net',
    'likes: 5'
  )

})

test('clicking like button twice calls handler function twice', async () => {
  const user = {
    username: 'mikkopaa',
    name: 'Mikko Paajanen'
  }

  const blog = {
    title: 'testing, testing, testing...',
    author: 'Crash Test Dummy',
    url: 'www.testing.net',
    likes: 5,
    user: {
      username: 'mikkopaa',
      name: 'Mikko Paajanen'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} user={user} likeAdder={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})