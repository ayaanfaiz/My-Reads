import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {PropTypes} from 'prop-types'
import BookShelf from './BookShelf'

class SearchBooks extends Component {

  state = {
      books: [],
      query: ''
    }
    changeShelf(newBooks, oldBooks){
    return newBooks.map((book) => {
      oldBooks.forEach((eachBook) => {
        if(eachBook.id === book.id){
          book.shelf = eachBook.shelf
          return
        }
      })
      return book
    })
  }
    updateShelf = (newBook, book, value) => {
      BooksAPI.update(book, value).then(() =>
        this.setState({ books : newBook})
      )
      this.props.updateMain(this.state.books, value)
    }

    updateQuery = (event) => {
      const value = event.target.value
      this.setState({query: value})
      if (value !== '') {
        BooksAPI.search(value, 10).then((books) => {
          console.log(books);
          if(books.error != "empty query"){
            if(books != null){
              books = books.filter((book)=> (book.imageLinks))
              books = this.changeShelf(books, this.props.books)
              this.setState({books})
            }
            else{
              this.setState({books: []})
            }
          }
          else{
            this.setState({books: []})
          }
        })
      }
      else {
        this.setState({books: [], query: ''})
      }
    }


    render() {
      return (
        <div>
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={this.updateQuery}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          {this.state.query !== '' && this.state.books != null && (<BookShelf title="Sarch Results" books={this.state.books} updateIt={this.updateShelf} />)}
        </div>
      )
    }
  }
  export default SearchBooks
