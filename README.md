# Book Finder API App

A React app that searches and displays book data from the free [Open Library Search API](https://openlibrary.org/dev/docs/api/search).

## API used

This project uses the Open Library Search API:

```txt
https://openlibrary.org/search.json?q={searchTerm}
```

Open Library is listed in the [public-apis repository](https://github.com/public-apis/public-apis) and does not require an API key.

## Features

- Search for books by title, author, or topic
- Fetch fresh API data when the search input changes
- Display useful book details such as title, author, publication year, edition count, and subjects
- Show a loading spinner while data is being fetched
- Handle errors with a clear, friendly message
- Keep all API logic inside a custom React hook: `useBookSearch`
- Responsive layout with semantic HTML and accessible form labels

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

## Challenge I hit

One challenge was making the search feel responsive without calling the API on every single keystroke. I solved this by adding a short debounce inside the custom hook, so the app waits briefly before sending the next search request.

## Submission note

API used: Open Library Search API.  
Challenge: Debouncing search requests while still keeping loading and error states clear for the user.
