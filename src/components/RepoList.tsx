import { useState, useEffect } from 'react'
import { DAYS_SPAN, GITHUB_URL, RESULTS_AMOUNT } from '../config'
import { getPastDate } from '../utils/dates'
import { LoadingSkeleton } from './LoadingSkeleton'

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
  const date = getPastDate(DAYS_SPAN)
  const query = `${GITHUB_URL}?q=created:>${date}&sort=stars&order=desc&per_page=${RESULTS_AMOUNT}`

  const { data, loading, error } = useFetchData(query)

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    // TODO: improve style
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    // TODO: improve style
    return <div>No data available</div>
  }

  const tableHeader = ['Stars', 'Repo Name', 'Description', 'Action']

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='mt-10 w-full text-left text-sm text-gray-400'>
        <thead className='bg-gray-700 text-xs uppercase text-gray-400'>
          <tr>
            {tableHeader.map((header, index) => (
              <th scope='col' key={index} className='px-6 py-3'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.items.length > 0 ? (
            data.items.map((item: RepoItem) => (
              <tr
                key={item.id}
                className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
              >
                <td className='px-6 py-4'>{item.stargazers_count}</td>
                <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                  <a href={item.html_url} target='_blank' rel='noreferrer'>
                    {item.name}
                  </a>
                </td>
                <td className='px-6 py-4'>{item.description}</td>
                <td className='px-6 py-4'>
                  <a href='/#' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                    Favorite
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <div>No items found</div>
          )}
        </tbody>
      </table>
    </div>
  )
}
