const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token, userCreatedBlog

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

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username missing')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is less than 3 characters', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be at least 3 characters long')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is less than 3 characters', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sa'
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  describe('when the user has logged in', () => {
    beforeEach(async () => {
      const userLogin = {
        username: 'root',
        password: 'sekret'
      }
      const response = await api
        .post('/api/login')
        .send(userLogin)
      token = response.body.token
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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await listHelper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length + 1)

      const title = blogsAtEnd.map(b => b.title)
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
        .set('Authorization', `bearer ${token}`)
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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    describe('when the logged in user has created a note', () => {
      beforeEach(async () => {
        const newBlog = {
          title: "My cool blog post",
          author: "Alex Kaminski",
          url: "https://alexkaminski.com.au/",
          likes: 9
        }

        const response = await api
          .post('/api/blogs')
          .set('Authorization', `bearer ${token}`)
          .send(newBlog)
          userCreatedBlog = response.body
      })
      test('the blog can be deleted', async () => {
        let blogsAtStart = await listHelper.blogsInDb()
        let blogToDelete = userCreatedBlog

        await api
          .delete(`/api/blogs/${userCreatedBlog.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(204)

        const blogsAtEnd = await listHelper.blogsInDb()

        expect(blogsAtEnd.length).toBe(
          blogsAtStart.length - 1
        )

        const title = blogsAtEnd.map(b => b.title)

        expect(title).not.toContain(blogToDelete.title)
      })

      test('the blog can be updated', async () => {
        const blogsAtStart = await listHelper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = 13

        const response = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .set('Authorization', `bearer ${token}`)
          .send(blogToUpdate)
          .expect(200)
          .expect('Content-Type', /application\/json/)
        expect(response.body.likes).toBe(13)
      })
    })
  })
})
afterAll(() => {
  mongoose.connection.close()
})