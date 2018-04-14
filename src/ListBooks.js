import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import BooksApp from './App'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  state = {
    books: this.props.books
  }

  updateCurrent = (newBook, book, value) => {
    BooksAPI.update(book, value).then(() =>
      this.setState({ books : newBook})
    )
  }
  updateRead = (newBook, book, value) => {
    BooksAPI.update(book, value).then(() =>
      this.setState({ books : newBook})
    )

  }
  updateWant = (newBook, book, value) => {
    BooksAPI.update(book, value).then(() =>
      this.setState({ books : newBook})
    )

  }





  render() {
      console.log(this.props.books)

    //  if (this.state.flag == true) {
        let currentlyReading = this.props.books.filter((book) => { return book.shelf === 'currentlyReading'})
        let read = this.props.books.filter((book) => {return book.shelf === 'read'})
        let wantToRead = this.props.books.filter((book) => {return book.shelf === 'wantToRead'})
    //  }

      return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1> My Reads </h1>
        </div>
        <div className='list-books-content'>
          <BookShelf updateIt={this.updateCurrent} shelfName='Currently Reading' books={currentlyReading} currentlyReading={currentlyReading} read={read} wantToRead={wantToRead}/>
          <BookShelf updateIt={this.updateRead} shelfName='Read' books={read}  currentlyReading={currentlyReading} read={read} wantToRead={wantToRead}/>
          <BookShelf updateIt={this.updateWant} shelfName='Want to read' books={wantToRead}  currentlyReading={currentlyReading} read={read} wantToRead={wantToRead}/>
        </div>
        <div className='open-search'>
          <Link to='/search'>
          Search Book
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
