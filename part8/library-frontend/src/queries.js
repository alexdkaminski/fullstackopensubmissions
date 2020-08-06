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
    author
    published
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
    author
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

export { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK, EDIT_AUTHOR }