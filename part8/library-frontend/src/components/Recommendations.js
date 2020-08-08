import React, { useEffect, useState }  from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { FAVOURITE_GENRE, BOOKS_BY_GENRE } from '../queries'
import { resultKeyNameFromField } from '@apollo/client/utilities'

const Recommendations = (props) => {
  const [getBooks, booksResult] = useLazyQuery(BOOKS_BY_GENRE)
  const genre = useQuery(FAVOURITE_GENRE, {skip: !props.token})
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
      console.log(genre)
      if (genre.data) {
        console.log(genre.data.me.favouriteGenre)
        props.setFavouriteGenre(genre.data.me.favouriteGenre)
        getBooks({ variables: { genre: genre.data.me.favouriteGenre }})
    }
  }, [genre.data])

  useEffect(() => {
    if (booksResult.data) {
      console.log(booksResult.data.allBooks)
      setFilteredBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

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