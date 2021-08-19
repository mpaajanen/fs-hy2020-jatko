describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Teppo Testaaja',
      username: 'testaaja',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      const username = 'testaaja'
      const password = 'testing'

      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password: 'testing' })
    })

    it('A blog can be created and liked', function() {
      const title = 'Nice ways to add new entries'
      const author = 'Rowan Atkinson'
      cy.get('#add-button').click()

      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type('www.testing.net')
      cy.get('#create-button').click()

      cy.contains(title)

      cy.get('#view-button').click()
      cy.get('#like-button').click()

      cy.get('#likes').contains('likes: 1')
    })
  })

  describe('More tests for blogs', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password: 'testing' })
    })

    it('A blog can be removed', function() {
      cy.createBlog({ title: 'Testing like never before', author: 'Neil Robertson', url: 'testing.net' })

      cy.get('#view-button').click()
      cy.get('#remove-button').click()

      // cy.get('html').contains(title).should('not.exist')
      cy.get('html').should('not.contain', 'Testing like never before')
    })

    it('have blogs been ordered by likes', function() {
      cy.createBlog({ title: 'Testing like never before', author: 'Neil Robertson', url: 'testing.net' })
      cy.createBlog({ title: 'Unique ways to break tests', author: 'Kyren Wilson', url: 'testing.net' })
      cy.contains('Kyren Wilson').find('button').click()

      cy.get('[id="like-button"]')
        .then( likeButtons => {
          cy.wrap(likeButtons[1]).click()
        })

      cy.visit('http://localhost:3000')

      cy.get('#listedBlogs:first').should('contain', 'Unique ways to break tests')
    })
  })
})