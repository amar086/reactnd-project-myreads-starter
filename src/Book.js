import React from 'react'
// import * as BooksAPI from './BooksAPI'
 
class Book extends React.Component {

  constructor(props) {
    super(props);
  }

  updateCategory = (value) => {
      this.props.updateCategory(this.props.book.id,value);
  }  


  render() {
    return (
                       <div className="book">
                          <div className="book-top">
                            <div className="book-cover" 
                            style={{ 
                              width: 128, height: 193, 
                              backgroundImage: `url(${this.props.book.imageLinks.thumbnail}`
                            }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select value={this.props.book.shelf} onChange={event => this.updateCategory(event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none" >None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{this.props.book.title}</div>
                          <div className="book-authors">
                            {this.props.book.authors && this.props.book.authors.length >0 ? (  
                                this.props.book.authors.map((author) => (<span key={author}>{author}</span>)))
                            : ''}
                         </div>
                        </div>
                  
        )}
}

export default Book
