import _ from 'lodash'
import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';


class Search extends React.Component { 

  addToShelf = (id,value) => {
       this.props.addToShelf(id,value);
  }  


  bookSearch = (query) => {
    if(query.trim() === ""){
      this.setState({searchResults: []});
    }else {
    BooksAPI.search(query).then((results) => {
      let searchResults = []; 
      if(!results.error){
        console.log(results);
        searchResults = results.filter((b) => b.imageLinks && b.imageLinks.thumbnail); 
        searchResults.map((resultItem) => {
            let found = this.props.shelfBooks.filter((b) => b.id === resultItem.id);
            if(found && found.length > 0){
              resultItem.shelf = found[0].shelf;
            }else {
              resultItem.shelf = "none";
            }
            return resultItem;
        });
      }
      this.setState({searchResults: searchResults});
    });
  }
  } 


  state = {
   searchResults:[]
  }



  render() {

    const bookSearch  = _.debounce((query) => {this.bookSearch(query)}, 300);

    return (
          <div className="search-books">
           <div className="search-books-bar">
              <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event) => bookSearch(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                     {this.state.searchResults.map((bookItem) => (
                      <li key={bookItem.id}>
                         <Book book={bookItem} updateCategory={this.addToShelf} />
                      </li>
                      ))
                     }
                </ol>
            </div>
            </div>
            
         )
  }
}


Search.propTypes = {
    shelfBooks: PropTypes.array
};


export default Search