import React from 'react'
// import * as BooksAPI from './BooksAPI'

import Book from './Book'

class ListBooks extends React.Component { 


  updateCategory = (id,value) => {
       this.props.updateCategory(id,value);
  }  

  render() {

    const {books} = this.props;
    const {title} = this.props; 

    return (
               <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.map((bookItem) => (
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
