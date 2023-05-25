import { useCallback, useEffect, useState } from 'react'

import { useFetchData } from '../hooks/useFetchData'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { RepoItem } from '../types/repo'
import { getPastDate } from '../utils/dates'
import { LoadingSkeleton } from './LoadingSkeleton'

import starFullIcon from '../assets/star-full.png'
import starEmptyIcon from '../assets/star-empty.png'

import { DAYS_SPAN, GITHUB_URL, RESULTS_AMOUNT } from '../config'

import { Tab } from '../types/tab'

export const RepoList = ({ tab }: { tab: Tab }) => {
  // static headers of the table
  const tableHeader = ['Stars', 'Repo Name', 'Description', 'Language', 'Favorite']

  // setup the query to fetch the repos
  const date = getPastDate(DAYS_SPAN)
  const query = `${GITHUB_URL}?q=created:>${date}&sort=stars&order=desc&per_page=${RESULTS_AMOUNT}`

  // --- hooks ---
  const { data: repositories, loading, error } = useFetchData(query)
  const [favoriteRepos, setFavoriteRepos] = useLocalStorage('favoriteRepos', [])

  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  // ----

  useEffect(() => {
    if (repositories && repositories.items.length > 0) {
      const languages = Array.from(new Set(repositories.items.map((repo: RepoItem) => repo.language))).filter(Boolean)
      setAvailableLanguages(languages as string[])
    }
  }, [repositories])

  const addFavoriteRepo = useCallback(
    (repo: RepoItem) => {
      if (!favoriteRepos.some((el: RepoItem) => el.id === repo.id)) {
        setFavoriteRepos([...favoriteRepos, repo])
      }
    },
    [favoriteRepos, setFavoriteRepos],
  )

  const removeFavoriteRepo = useCallback(
    (repo: RepoItem) => {
      setFavoriteRepos(favoriteRepos.filter((el: RepoItem) => el.id !== repo.id))
    },
    [favoriteRepos, setFavoriteRepos],
  )

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <div className='rounded bg-red-800 px-4 py-2 font-bold text-white'>Error: {error.message}</div>
  }

  if (!repositories || repositories.items.length === 0) {
    return (
      <div className='mb-4 flex rounded-lg bg-gray-800 p-4 text-sm text-yellow-300' role='alert'>
        <span className='sr-only'>Warning</span>
        <div>Something went wrong. Please refresh.</div>
      </div>
    )
  }

  // Filter the repositories based on the selected language
  const filteredRepositories = repositories?.items.filter((repo: RepoItem) => {
    if (!selectedLanguage) {
      // If no language is selected, show all repositories
      return true
    }
    // Show repositories that match the selected language
    return repo.language === selectedLanguage
  })

  return (
    <div id={`tab-${tab}`} className={'relative overflow-x-auto shadow-md sm:rounded-lg'}>
      <div className='filters center mb-5'>
        <label htmlFor='languages' className='mb-2 mr-3 text-sm font-medium text-white'>
          Filter by:
        </label>
        <select
          id='languages'
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className='rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
        >
          <option value=''>All Languages</option>
          {availableLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <h2 className='sr-only'>Top Github repos of the last {DAYS_SPAN} days</h2>
      <table className='w-full text-left text-sm text-gray-400'>
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
          {filteredRepositories.map((item: RepoItem) => (
            <tr key={item.id} className='border-b border-gray-700 bg-gray-800 hover:bg-gray-600'>
              <td className='px-6 py-4'>{item.stargazers_count}</td>
              <td className='whitespace-nowrap px-6 py-4 font-medium text-white hover:underline'>
                <a href={item.html_url} target='_blank' rel='noreferrer'>
                  {item.name}
                </a>
              </td>
              <td className='px-6 py-4'>{item.description}</td>
              <td className='px-6 py-4'>{item.language ?? 'N/A'}</td>
              <td className='px-6 py-4'>
                {favoriteRepos.some((el: RepoItem) => el.id === item.id) ? (
                  <button
                    className='font-medium text-blue-500 hover:underline'
                    onClick={() => removeFavoriteRepo(item)}
                  >
                    <img className='h-8 w-8' src={starFullIcon} alt='remove from favorites' />
                  </button>
                ) : (
                  <button className='font-medium text-blue-500 hover:underline' onClick={() => addFavoriteRepo(item)}>
                    <img className='h-8 w-8' src={starEmptyIcon} alt='add to favorites' />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
