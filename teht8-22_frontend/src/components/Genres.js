const Genres = (props) => {
  const genres = props.genres
  console.log(genres)

  const handleGenreSelection = (genre) => {
    console.log(genre)
  }

  const handleAllGenres = () => {
    console.log('All genres')
  }

  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleGenreSelection(genre)}>{genre}</button>
        ))}    
      <button onClick={() => handleAllGenres()}>All genres</button>
    </div>
  )
}

export default Genres
