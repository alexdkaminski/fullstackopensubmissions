const { ApolloServer, gql, UserInputError } = require('apollo-server')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

const resolvers = {
  Query: {   
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      // const byAuthor = (book) => 
      //   book.author === args.author ? book : !book
      if (args.genre) {
        return Book.find()
        .where({genres: {$in: [args.genre]}}).populate("author")
      }
      // if (args.author && args.genre) {
      //   return books.filter(byAuthor).filter(byGenre)
      // } else if (args.author) {
      //   return books.filter(byAuthor)
      // } else if (args.genre) {
      //   return books.filter(byGenre)
      // } else {
      //   return books
      // }
      return Book.find({}).populate("author")
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const authorId = root._id
      // const books = await Book.find({author: { root._id }})
      // const authoredBooks = books.filter(book => book.author === root._id ? book : !book)
      // return authoredBooks.length
      return Book.collection.countDocuments({author: { $eq: authorId}})
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let book = await Book.findOne({ title: args.title})
      if (book) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.title,
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        console.log('Author not found, creating author')
        author = new Author({ name: args.author })
        await author.save()
      }
      book = new Book({ ...args, author: author._id })
      console.log(book)
      await book.save()

      const savedBook = await book.populate('author').execPopulate()
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new UserInputError('Author not found')
      }
      author.born = args.setBornTo
      await author.save()
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})