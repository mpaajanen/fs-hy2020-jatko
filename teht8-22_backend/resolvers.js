const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = process.env.PASS

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre){
        return Book.find({}).populate('author')
      }
      if (args.author && args.genre){
        const author = await Author.find({ name: args.author })
        return Book.find({
          author: author[0]._id, 
          genres: { $in: args.genre }
        }).populate('author')
      }
      if (args.author){
        const author = await Author.find({ name: args.author })
        return Book.find({author: author[0]._id}).populate('author')
      }
      if (args.genre){
        return Book.find({genres: { $in: args.genre }}).populate('author')
      }
    },
    allAuthors: async () => {
      const books = await Book.find({}).populate('author', { name: 1, born: 1 })
      const authors = books.reduce((authorsArr, book) => {
        return authorsArr.find(({ name }) => name === book.author?.name)
        ? authorsArr
        : [...authorsArr, book.author]
      }, [])
      return authors.map(author => ({
        ...author.toJSON(),
        bookCount: books.filter(book => book.author?.name === author.name).length,
      }))

      // const authors = Author.find({}).populate('authorOf')
      // const a = Author.find({}).aggregate({$match: { authorOf }}, {$count: "numBooks"} )
      // console.log(authors)
      // return authors
    },
    allGenres: async () => {
      const genres = []
      const books = await Book.find({})
      books.forEach(book => {
        book.genres.forEach(genre => {
          genres.includes(genre) ? null: genres.push(genre)
        });
        // console.log(book.genres)
      });
      return genres
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  // Author: {
  //   bookCount: async (root) => {
  //     // console.log('Book.find')
  //     const books = await Book.find({
  //       author: {
  //         $in: root._id
  //       }
  //     })
  //     return books.length
  //   }
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      // const book = new Book({ ...args, author: await Author.findOne({ name: args.author }) })
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        let authorId = await Author.findOne({ name: args.author }).select('_id')
        if (!authorId) {
          const author = new Author({ name: args.author })
          await author.validate()
          authorId = author._id
          // const validateBook = new Book({ ...args, author: authorId })
          const validateBook = new Book({ ...args, author })
          await validateBook.validate()
          await author.save()
        }  
        const book = new Book({ ...args, author: await Author.findOne({ name: args.author }) })
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
  
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })  
      }  
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ 
        username: args.username, 
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers