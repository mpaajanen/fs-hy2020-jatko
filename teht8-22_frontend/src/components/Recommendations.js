import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS_BY_GENRE, ME } from "../queries"

const Recommendations = (props) => {

  const [genre, setGenre] = useState(null)

  const booksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre
  })
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  })

  const currentUser = data?.me

  useEffect(() => {
    if (currentUser) {
      setGenre(currentUser.favoriteGenre)
    }
  }, [currentUser])

  if (booksByGenre.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (!props.show) {
    return null
  }

  if (genre && booksByGenre.data) {
    return (
      <div>
        <h2>recommendations</h2>
        <div>
        Books in your favorite genre <b>{genre}</b>:<br />
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksByGenre.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
  return (
    <div>loading...</div>
  )
}

export default Recommendations
