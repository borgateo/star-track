import { useState, useEffect } from 'react'
import { RepoData } from '../types/repo'

export const useFetchData = (url: string) => {
  const [data, setData] = useState<RepoData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // after N requests, GH returns an error saying that I reached the limit of requests for my IP
  const mockDataMode = true

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(mockDataMode ? 'mock.json' : url)
        if (!response.ok) {
          throw new Error('Request failed')
        }
        const json: RepoData = await response.json()
        setData(json)
        setLoading(false)
      } catch (error) {
        setError(error as Error)
        setLoading(false)
      }
    }

    fetchData()
  }, [url, mockDataMode])

  return { data, loading, error }
}
