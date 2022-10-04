import Genres from "./Genres"
import { ALL_BOOKS_BY_GENRE } from "../queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const booksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre
  })

  if (!props.show) {
    return null
  }

  const books = props.books

  const handleGenreSelection = (genre) => {
    console.log('genre selection', genre)
    setGenre(genre)
  }

  const allOrSelection = () => {
    if (genre && booksByGenre.data) {
      return (
        <>
          {booksByGenre.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </>
      )
    }

    return (
      <>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </>
    )

  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allOrSelection()}
        </tbody>
      </table>
      <Genres genres={props.genres} handleGenreSelection={handleGenreSelection} />
    </div>
  )
}

export default Books
