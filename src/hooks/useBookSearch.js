import { useCallback, useEffect, useState } from 'react';

const API_URL = 'https://openlibrary.org/search.json';
const RESULT_LIMIT = 12;
const SEARCH_DELAY_IN_MS = 500;

function normaliseBook(book) {
  return {
    key: book.key,
    title: book.title || 'Untitled book',
    authors: book.author_name?.slice(0, 3) || ['Unknown author'],
    firstPublishYear: book.first_publish_year || 'Year unknown',
    editionCount: book.edition_count || 0,
    subjects: book.subject?.slice(0, 3) || [],
    coverId: book.cover_i,
  };
}

export function useBookSearch(initialQuery = 'javascript') {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, SEARCH_DELAY_IN_MS);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setBooks([]);
      setTotalResults(0);
      setError('');
      return;
    }

    const controller = new AbortController();

    async function fetchBooks() {
      setIsLoading(true);
      setError('');

      try {
        const searchParams = new URLSearchParams({
          q: debouncedQuery,
          limit: RESULT_LIMIT.toString(),
        });

        const response = await fetch(`${API_URL}?${searchParams}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setBooks(data.docs.map(normaliseBook));
        setTotalResults(data.numFound || 0);
      } catch (currentError) {
        if (currentError.name === 'AbortError') {
          return;
        }

        setBooks([]);
        setTotalResults(0);
        setError(
          'The books could not be loaded right now. Please check your connection and try again.',
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, [debouncedQuery, refreshKey]);

  const updateQuery = useCallback((nextQuery) => {
    setQuery(nextQuery);
  }, []);

  const retrySearch = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  return {
    books,
    error,
    isLoading,
    query,
    totalResults,
    updateQuery,
    retrySearch,
  };
}
