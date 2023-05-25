import { useLocalStorage } from '../hooks/useLocalStorage'

import { RepoItem } from '../types/repo'
import { Tab } from '../types/tab'

import removeIcon from '../assets/remove.png'
import { useCallback, useEffect, useState } from 'react'

export const Favorites = ({ tab }: { tab: Tab }) => {
  // static headers of the table
  const tableHeader = ['Stars', 'Repo Name', 'Description', 'Language', 'Favorite']

  const [favoriteRepos, setFavoriteRepos] = useLocalStorage('favoriteRepos', [])

  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  useEffect(() => {
    if (favoriteRepos && favoriteRepos.length > 0) {
      const languages = Array.from(new Set(favoriteRepos.map((repo: RepoItem) => repo.language))).filter(Boolean)
      setAvailableLanguages(languages as string[])
    }
  }, [favoriteRepos])

  // This function handles a complex scenario where we need to account for an edge case.
  // When a user applies a language filter and subsequently removes all repositories from the favorites list,
  // we want to ensure that the language filter is reset to the default value of 'all languages'.
  const removeFavoriteRepo = useCallback(
    (repo: RepoItem) => {
      setFavoriteRepos((prevFavoriteRepos: RepoItem[]) => {
        const updatedRepos = prevFavoriteRepos.filter((el: RepoItem) => el.id !== repo.id)

        const hasSelectedLanguageRepos = updatedRepos.some((el: RepoItem) => el.language === selectedLanguage)

        if (!hasSelectedLanguageRepos) {
          setSelectedLanguage('')
        }

        return updatedRepos
      })
    },
    [setFavoriteRepos, selectedLanguage, setSelectedLanguage],
  )

  if (!favoriteRepos || favoriteRepos.length === 0) {
    return (
      <div className='mb-4 flex rounded-lg bg-gray-800 p-4 text-sm text-blue-400' role='alert'>
        <span className='sr-only'>Info</span>
        <div>No favorites found. Please add items from the Repo tab to create your list of favorites.</div>
      </div>
    )
  }

  const filteredFavRepositories = favoriteRepos?.filter((repo: RepoItem) => {
    if (!selectedLanguage) {
      // If no language is selected, show all repositories
      return true
    }

    // Show repositories that match the selected language
    return repo.language === selectedLanguage
  })

  return (
    <div id={`tab-${tab}`} className={'relative overflow-x-auto shadow-md sm:rounded-lg'}>
      <h2 className='sr-only'>Favorite Github Repos</h2>
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
          {filteredFavRepositories.map((item: RepoItem) => (
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
                <button className='font-medium text-blue-500 hover:underline' onClick={() => removeFavoriteRepo(item)}>
                  <img className='h-8 w-8' src={removeIcon} alt='remove from favorites' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
