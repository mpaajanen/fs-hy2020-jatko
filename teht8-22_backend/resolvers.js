const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = process.env.PASS

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
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const genres = []
      const books = await Book.find({})
      books.forEach(book => {
        book.genres.forEach(genre => {
          genres.includes(genre) ? null: genres.push(genre)
        });
        console.log(book.genres)
      });
      return genres
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => {
      const authorsBooks = books.filter(book => book.author === root.name)
      return authorsBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
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
        // const book = new Book({ ...args, author: authorId })
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
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers