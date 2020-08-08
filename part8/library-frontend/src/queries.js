import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
	addBook(
    title: $title,
    author: $author,
    published: $published
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
  }
}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
      id
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const FAVOURITE_GENRE = gql`
  query {
    me {
      favouriteGenre
    }
  }
`

const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

export { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK, EDIT_AUTHOR, LOGIN, FAVOURITE_GENRE, BOOKS_BY_GENRE }