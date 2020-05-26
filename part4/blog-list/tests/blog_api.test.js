const supertest = require('supertest')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = listHelper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogsAtEnd = await listHelper.blogsInDb()
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(blogsAtEnd.length)
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: "My cool blog post",
    author: "Alex Kaminski",
    url: "https://alexkaminski.com.au/",
    likes: 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await listHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain(
    'My cool blog post'
  )
})

test('a blog post with no likes property defaults to a value of 0', async () => {
  const newBlog = {
    title: "An unliked post",
    author: "Katie Dangerfield",
    url: "https://katiedangerfield.com.au/"
  }

  const response =  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('a blog post without a title and url is rejected', async () => {
  const newBlog = {
    author: "Alex Kaminski",
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})