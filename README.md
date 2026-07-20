# Book Finder

This is a small React app for searching books with the free [Open Library Search API](https://openlibrary.org/dev/docs/api/search).

## API used

This project uses the Open Library Search API:

```txt
https://openlibrary.org/search.json?q={searchTerm}
```

Open Library is listed in the [public-apis repository](https://github.com/public-apis/public-apis) and does not require an API key.

## What it does

- Search for books by title, author, or topic
- Fetch new results when the search changes
- Show book titles, authors, first published year, edition count, subjects, and covers where available
- Show a loading spinner while waiting for the API
- Show an error message if the request fails
- Keep the API logic inside `useBookSearch`

## Tech stack

- React
- Vite
- JavaScript
- CSS
- Open Library Search API

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Project structure

```txt
src/
  components/
    BookCard.jsx
    SearchForm.jsx
  hooks/
    useBookSearch.js
  App.jsx
  index.css
  main.jsx
```

## Challenge

The main challenge was stopping the app from calling the API too many times while typing. I added a short delay in the custom hook before running the search.

## Submission note

API used: Open Library Search API.  
Challenge: Adding a delay to the search so the app does not send a request for every key press.
