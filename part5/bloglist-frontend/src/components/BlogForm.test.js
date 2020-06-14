import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls the event handler', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Test blog' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Testy McTesterson' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://te.st' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Testy McTesterson')
  expect(createBlog.mock.calls[0][0].url).toBe('https://te.st')

})