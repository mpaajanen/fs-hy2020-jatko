const Genres = (props) => {
  const genres = props.genres
  
  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => props.handleGenreSelection(genre)}>{genre}</button>
        ))}    
      <button onClick={() => props.handleGenreSelection(null)}>All genres</button>
    </div>
  )
}

export default Genres
