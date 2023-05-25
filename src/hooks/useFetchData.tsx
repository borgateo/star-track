import { useState, useEffect } from 'react'
import { RepoData } from '../types/repo'

import { MOCK_DATA_MODE } from '../config'

export const useFetchData = (url: string) => {
  const [data, setData] = useState<RepoData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(MOCK_DATA_MODE ? 'mock.json' : url)
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
  }, [url])

  return { data, loading, error }
}
