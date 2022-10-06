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
      author {
        name
      }
      published
      genres
    }
  }
  `

export const ALL_BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
  `

export const ALL_GENRES = gql`
  query {
    allGenres
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
      author {
        name
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    genres
    published
  }
`

// export const BOOK_ADDED = gql`
//   subscription {
//     bookAdded {
//       title
//     }
//   }
// `
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`