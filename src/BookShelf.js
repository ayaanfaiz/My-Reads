import React, { Component } from 'react'
import './App.css'
import BookApp from './App'
import ListBooks from './ListBooks'


class BookShelf extends Component {

  updateShelf = (value, book) => {
     if(value === 'currentlyReading'){
       book.shelf = 'currentlyReading'
       this.props.updateIt(this.props.books, book, value)

     }
     else if(value === 'read'){
       book.shelf = 'read'
       this.props.updateIt(this.props.books, book, value)
     }
     else if(value === 'wantToRead'){
       book.shelf = 'wantToRead'
       this.props.updateIt(this.props.books, book, value)
     }
     else{
       book.shelf = 'none'
       this.props.updateIt(this.props.books, book, value)
     }
     this.forceUpdate()
   }

  render(){
    return (
      <div>
        <div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}{this.props.shelfName}</h2>
                  <ol className="books-grid">
                  {(this.props.books != null) && (
                      this.props.books.map((book, index) =>
                      <li key={index}>
                          <div className="book">
                              <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 170, backgroundImage: (`url(${book.imageLinks.thumbnail})`)}}></div>
                                  <div className="book-shelf-changer">
                                      <select value={book.shelf || 'none'} onChange={(event) => this.updateShelf(event.target.value, book)}>
                                          <option disabled>Move to...</option>
                                          <option value="currentlyReading">Currently Reading</option>
                                          <option value="wantToRead">Want to Read</option>
                                          <option value="read">Read</option>
                                          <option value="none">None</option>
                                      </select>
                                  </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors"></div>
                          </div>
                      </li>
                  ))}
                  </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default BookShelf
