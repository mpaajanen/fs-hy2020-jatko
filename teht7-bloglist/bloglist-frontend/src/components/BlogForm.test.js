import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const handleCreate = jest.fn()

  const component = render(
    <BlogForm handleSubmit={handleCreate} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })

  fireEvent.change(author, {
    target: { value: 'Esko Valtaoja' }
  })

  fireEvent.change(url, {
    target: { value: 'www.testing.net' }
  })

  fireEvent.submit(form)

  expect(handleCreate.mock.calls).toHaveLength(1)
  expect(handleCreate.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(handleCreate.mock.calls[0][0].author).toBe('Esko Valtaoja')
  expect(handleCreate.mock.calls[0][0].url).toBe('www.testing.net')
})