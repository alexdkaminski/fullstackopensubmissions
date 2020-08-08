import React, { useEffect, useState }  from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setFilteredBooks(result.data.allBooks)
      const genreReducer = (genres, book) => {
        const newGenres = book.genres.filter((g) => g && !genres.includes(g))
        return genres.concat(newGenres)
      }
      const genresList = result.data.allBooks.reduce(genreReducer, [])
      setGenres(genresList)
    }
  }, [result])

  const changeGenre = (genre) => {
    if (genre === "all") {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(books.filter(book => book.genres.includes(genre)))
    }
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        Genre: 
       <select onChange={({ target }) => changeGenre(target.value)}>
         <option value="all">all</option>
        {genres.map(g =>
          <option key={g} value={g}>{g}</option>
        )}
       </select>
      </div>
    </div>
  )
}

export default Books