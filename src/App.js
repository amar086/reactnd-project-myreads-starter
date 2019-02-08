import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component { 


  constructor(props) {
    super(props);

    BooksAPI.getAll().then((books) => {
        this.setState({books:books});
    });
  } 

  getBooksByShelf = (shelf) => {
      return this.state && this.state.books ? this.state.books.filter((b) => b.imageLinks && b.imageLinks.thumbnail && b.shelf === shelf): [];
  }


  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[]
  } 


  updateCategory = (bookId, newCategoryValue) => {
      let books =  this.state.books;
      let b = books.filter((b) => b.id === bookId);
      b = b[0];
      if(b.shelf === newCategoryValue) 
          return; 

      if(newCategoryValue === "none"){
         let index = books.indexOf(b);
         if(index >= 0){
           books.splice(index,1);
           console.log("index=" + index + " removed " + b.title);
         }
      }  

      BooksAPI.update(b, newCategoryValue).then((result) => {
        b.shelf = newCategoryValue;
        this.setState({books:books});
      });
  }  

  addToShelf = (bookId, category) => {
    let books =  this.state.books;
    let found = books.filter((b) => b.id === bookId); 
    if(found && found.length > 0){ // book found in shelf
      let b = found[0];
      BooksAPI.update(b, category).then((result) => {
        b.shelf = category;
        this.setState({books:books});
      });
    }else { // book not found in shelf
        BooksAPI.get(bookId).then((book) => {
          BooksAPI.update(book, category).then((result) => {
                book.shelf = category;
                books.push(book);
                this.setState({books:books});
          });
      });
    }
  }


  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={() => (          
              <Search addToShelf={this.addToShelf} shelfBooks={this.state.books} /> 
        )}/>

        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <ListBooks title="Currently Reading" value="currentlyReading" books={this.getBooksByShelf('currentlyReading')} updateCategory={this.updateCategory}/>
                <ListBooks title="Want to Read"  books={this.getBooksByShelf('wantToRead')} updateCategory={this.updateCategory}/>
                <ListBooks title="Read" books={this.getBooksByShelf('read')} updateCategory={this.updateCategory}/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )}/>
      </div>
      )
}

}

export default BooksApp