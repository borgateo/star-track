# ⭐️ Star Track

This project is a React (TS) application that fetches and displays the top GitHub repositories based on the number of stars they have received. It uses `Vite` as the build tool, `React` as the UI library, `Tailwind CSS` for styling, and `local storage` for data persistence. The project includes testing using `Vitest` and `Testing Library`, although due to time constraints, there are limited test cases available.

[web site hosted on Netlify](https://startrackgh.netlify.app)

## Features

- Fetches the top GitHub repositories based on specified criteria
- Displays the fetched repositories in a table format
- Allows filtering of repositories by language
- Supports adding and removing repositories from favorites
- Persists the favorite repositories using local storage
- Provides configuration options through a config file

## Tech Stack

- Vite: A fast build tool for modern web applications
- React: A JavaScript library for building user interfaces
- Tailwind CSS: A utility-first CSS framework for rapid UI development
- Local Storage: A web API for storing data in the browser's local storage
- Fetch: A modern, promise-based API for making HTTP requests
- Vitest: A test runner and assertion library for React applications
- React Testing Library: A testing utility for testing React components
- PNPM: A fast, disk space-efficient package manager for JavaScript projects

## Configuration

The project includes a [configuration file](./src/config/index.tsx) that allows customization of certain parameters:

- `DAYS_SPAN`: The number of past days to consider when fetching repositories (default: 7)
- `RESULTS_AMOUNT`: The maximum number of repositories to fetch (default: 25)
- `MOCK_DATA_MODE`: A flag to enable/disable the use of static JSON data instead of making actual API calls (default: false)

## Prerequisites

Make sure you have installed all of the following prerequisites on your machine:

- Node.js - https://nodejs.org/en/download
- pnpm - https://pnpm.io/installation

## Getting started

To get started with Star Track, follow these steps:

1. Clone the repository: `git clone git@github.com:borgateo/star-track.git`
2. Install dependencies using PNPM: `pnpm install`
3. Start the development server: `pnpm dev`

Now, you should see a message indicating that the server is running at a specific address (usually http://localhost:5173).

## Testing

Run the tests:

```bash
$ pnpm test
```

View the test coverage:

```bash
$ pnpm coverage
```
