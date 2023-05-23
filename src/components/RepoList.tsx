import { useState, useEffect } from 'react'

type RepoItem = {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  watchers: number
  stargazers_count: number
}

type RepoData = {
  total_count: number
  incomplete_results: boolean
  items: Array<RepoItem>
}

// TODO: move to utils?
const useFetchData = (url: string) => {
  const [data, setData] = useState<RepoData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Request failed')
        }
        const json: RepoData = await response.json()
        setData(json)
        setLoading(false)

        console.log('----', json)
      } catch (error) {
        setError(error as Error)
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export const RepoList = () => {
  const results = '10'
  const date = '2023-05-18'
  const GITHUB_URL = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=${results}`

  const { data, loading, error } = useFetchData(GITHUB_URL)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <nav className='border-gray-200 bg-white dark:bg-gray-900'>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='bg-white pb-4 dark:bg-gray-900'>
          <label for='table-search' className='sr-only'>
            Search
          </label>
          <div className='relative mt-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='table-search'
              className='block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='Search for items'
            />
          </div>
        </div>

        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Repo Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Description
              </th>
              <th scope='col' className='px-6 py-3'>
                Stars
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.length > 0 ? (
              data.items.map((item: RepoItem) => (
                <tr
                  key={item.id}
                  className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                >
                  <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                    <a href={item.html_url} target='_blank' rel='noreferrer'>
                      {item.name}
                    </a>
                  </th>
                  <td className='px-6 py-4'>{item.description}</td>
                  <td className='px-6 py-4'>{item.stargazers_count}</td>
                  <td className='px-6 py-4'>
                    <a href='#' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                      Favorite
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div>No items found.</div>
            )}
          </tbody>
        </table>
      </div>
    </nav>
  )
}
