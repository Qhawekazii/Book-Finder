function getCoverUrl(coverId) {
  if (!coverId) {
    return null;
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}

export function BookCard({ book }) {
  const coverUrl = getCoverUrl(book.coverId);

  return (
    <article className="book-card">
      <div className="book-card__cover" aria-hidden="true">
        {coverUrl ? (
          <img src={coverUrl} alt="" loading="lazy" />
        ) : (
          <span>No cover</span>
        )}
      </div>

      <div className="book-card__content">
        <h3>{book.title}</h3>
        <p className="book-card__meta">{book.authors.join(', ')}</p>

        <dl className="book-card__facts">
          <div>
            <dt>First published</dt>
            <dd>{book.firstPublishYear}</dd>
          </div>
          <div>
            <dt>Editions</dt>
            <dd>{book.editionCount}</dd>
          </div>
        </dl>

        {book.subjects.length > 0 && (
          <ul className="tag-list" aria-label={`Subjects for ${book.title}`}>
            {book.subjects.map((subject) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
