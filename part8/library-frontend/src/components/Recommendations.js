import React, { useEffect, useState }  from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVOURITE_GENRE } from '../queries'

const Recommendations = (props) => {
  const allBooksQuery = useQuery(ALL_BOOKS)
  const favouriteGenreQuery = useQuery(FAVOURITE_GENRE)
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {

    if (allBooksQuery.data && favouriteGenreQuery.data) {
      if (favouriteGenreQuery.data.me) {
        setFilteredBooks(allBooksQuery.data.allBooks.filter(book => book.genres.includes(favouriteGenreQuery.data.me.favouriteGenre)))
      }
    }
  }, [allBooksQuery, favouriteGenreQuery, props.token])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

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
    </div>
  )
}

export default Recommendations