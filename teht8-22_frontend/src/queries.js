import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
  `

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
  `

export const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

export const SET_BORN = gql`
  mutation setBornTo(
    $author: String!,
    $born: Int!
  ) {
    editAuthor(
      name: $author
      setBornTo: $born
    ) {
      name
      born
    }
  }
`