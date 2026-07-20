import { BookCard } from './components/BookCard.jsx';
import { SearchForm } from './components/SearchForm.jsx';
import { useBookSearch } from './hooks/useBookSearch.js';

function App() {
  const {
    books,
    error,
    isLoading,
    query,
    totalResults,
    updateQuery,
    retrySearch,
  } = useBookSearch('javascript');

  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Open Library API explorer</p>
        <h1 id="page-title">Find your next useful read.</h1>
        <p className="hero__copy">
          Search millions of books from Open Library and quickly compare authors,
          publication years, subjects, and edition counts.
        </p>

        <SearchForm query={query} onQueryChange={updateQuery} />
      </section>

      <section className="results-panel" aria-labelledby="results-title">
        <div className="results-panel__header">
          <div>
            <p className="eyebrow">Search results</p>
            <h2 id="results-title">
              {totalResults > 0
                ? `${totalResults.toLocaleString()} matches found`
                : 'No matches yet'}
            </h2>
          </div>
          <span className="api-badge">Open Library Search API</span>
        </div>

        {isLoading && (
          <div className="status-card" role="status" aria-live="polite">
            <span className="spinner" aria-hidden="true"></span>
            <p>Loading books from the API...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="status-card status-card--error" role="alert">
            <div>
              <h3>Something went wrong</h3>
              <p>{error}</p>
            </div>
            <button className="button" type="button" onClick={retrySearch}>
              Try again
            </button>
          </div>
        )}

        {!error && !isLoading && books.length === 0 && (
          <div className="status-card">
            <h3>No books found</h3>
            <p>Try searching for another title, author, or topic.</p>
          </div>
        )}

        {!error && books.length > 0 && (
          <ul className="book-grid" aria-label="Book search results">
            {books.map((book) => (
              <li key={book.key}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
