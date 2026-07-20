export function SearchForm({ query, onQueryChange }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <label htmlFor="book-search">Search books</label>
      <div className="search-form__control">
        <input
          id="book-search"
          name="book-search"
          type="search"
          value={query}
          placeholder="Try: African literature, React, astronomy..."
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
