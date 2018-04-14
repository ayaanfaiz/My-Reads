import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }
  changeShelf = (id,shelf) => {
    BooksAPI.update({id},shelf).then(()=>{
      this.fetchMyBooks()
    })
  }
  

  render() {
    let allBooks = this.state.books;
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <ListBooks
            books={this.state.books}
          />
        }/>
        <Route exact path='/search' render={() =>
          <SearchBooks books={this.state.books}
          onShelfChange={(id,shelf)=>{
                  this.changeShelf(id,shelf)
                }}
            />
        }/>

      </div>
    )
  }
}

export default BooksApp
