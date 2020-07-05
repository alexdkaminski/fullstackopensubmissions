import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author but not url or likes', () => {
  const blog = {
    title: 'Test blog',
    author: 'Testy McTesterson',
    url: 'https://te.st',
    likes: 13,
    user: {
      username: 'Tester'
    }
  }

  const user = {
    username: 'Tester'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const blogDetails = component.container.querySelector('.blogDetails')

  expect(component.container).toHaveTextContent(
    'Test blog'
  )
  expect(component.container).toHaveTextContent(
    'Testy McTesterson'
  )
  expect(component.container).toHaveTextContent(
    'https://te.st'
  )
  expect(component.container).toHaveTextContent(
    '13'
  )
  expect(blogDetails).toHaveStyle('display:none')
})

test('blog url and likes are shown when toggle button is clicked', () => {
  const blog = {
    title: 'Test blog',
    author: 'Testy McTesterson',
    url: 'https://te.st',
    likes: 13,
    user: {
      username: 'Tester'
    }
  }

  const user = {
    username: 'Tester'
  }

  const mockUpdateBlogHandler = jest.fn()

  const mockDeleteBlogHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockUpdateBlogHandler} deleteBlog={mockDeleteBlogHandler}/>
  )

  const blogDetails = component.container.querySelector('.blogDetails')

  expect(blogDetails).toHaveStyle('display:none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(blogDetails).toHaveStyle('display:block')
})

test('event handler is called twice when like button is clicked twice', () => {
  const blog = {
    title: 'Test blog',
    author: 'Testy McTesterson',
    url: 'https://te.st',
    likes: 13,
    user: {
      username: 'Tester'
    }
  }

  const user = {
    username: 'Tester'
  }

  const mockUpdateBlogHandler = jest.fn()

  const mockDeleteBlogHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockUpdateBlogHandler} deleteBlog={mockDeleteBlogHandler}/>
  )

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockUpdateBlogHandler.mock.calls).toHaveLength(2)
})