import React from 'react'
// import * as BooksAPI from './BooksAPI'

import Book from './Book'

class ListBooks extends React.Component { 

  constructor(props) {
    super(props);
  }

  updateCategory = (id,value) => {
       this.props.updateCategory(id,value);
  }  

  render() {
    return (
               <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.map((bookItem) => (
                      <li key={bookItem.id}>
                         <Book book={bookItem} updateCategory={this.updateCategory} />
                      </li>
                      ))
                     }
                    </ol>
                  </div>
                  </div>
                </div>
                   
        )}
}

export default ListBooks
