describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Alex Kaminski',
      username: 'alexkaminski',
      password: 'secretpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })
  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('alexkaminski')
    cy.get('#password').type('secretpassword')
    cy.get('#login-button').click()

    cy.contains('Alex Kaminski logged in')
  })
  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('alexkaminski')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'alexkaminski', password: 'secretpassword' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com/blog')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Alex Kaminski', url: 'blog.com/1', likes: 1 })
        cy.createBlog({ title: 'second blog', author: 'Michael Rooney', url: 'blog.com/2', likes: 2 })
        cy.createBlog({ title: 'third blog', author: 'Katie Dangerfield', url: 'blog.com/3', likes: 3 })
      })

      it('one of those can be liked', function () {
        cy.contains('second blog').parent().find('button').eq(0).as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('second blog').parent().find('button').eq(1).as('likeButton')
        cy.get('.blogLikes').should('contain', '2')
        cy.get('@likeButton').click()
        cy.get('.blogLikes').should('contain', '3')
      })

      it('one of those can be deleted', function() {
        cy.contains('third blog').parent().find('button').eq(0).as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('third blog').parent().find('button').eq(2).as('deleteButton')
        cy.get('@deleteButton').click()
        cy.on('window:confirm', () => true)
        cy.contains('third blog').should('not.exist')
      })

      it.only('they are sorted by most likes', function() {
        cy.get('.blog').then((blogs) => {
          let prev = Number.MAX_SAFE_INTEGER
          for (let i = 0; i < blogs.length; i++) {
            cy.wrap(blogs[i]).contains('view').click()
            cy.wrap(blogs[i])
              .find('.blogLikes')
              .then((e) => {
                const likes = parseInt(e.text())
                expect(prev).to.be.greaterThan(likes)
                prev = likes
              })
          }
        })
      })
    })
  })
})