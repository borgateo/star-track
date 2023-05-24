import { DAYS_SPAN, GITHUB_URL, RESULTS_AMOUNT } from '../config'
import { useFetchData } from '../hooks/useFetchData'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { RepoItem } from '../types/repo'
import { getPastDate } from '../utils/dates'
import { LoadingSkeleton } from './LoadingSkeleton'

import starFullIcon from '../assets/star-full.png'
import starEmptyIcon from '../assets/star-empty.png'

export const RepoList = ({ isVisible = true }: { isVisible?: boolean }) => {
  const date = getPastDate(DAYS_SPAN)
  const query = `${GITHUB_URL}?q=created:>${date}&sort=stars&order=desc&per_page=${RESULTS_AMOUNT}`

  const { data: repositories, loading, error } = useFetchData(query)
  const [favoriteRepos, setFavoriteRepos] = useLocalStorage('favoriteRepos', [])

  const addFavoriteRepo = (repo: RepoItem) => {
    if (!favoriteRepos.some((el: RepoItem) => el.id === repo.id)) {
      setFavoriteRepos([...favoriteRepos, repo])
    }
  }

  const removeFavoriteRepo = (repo: RepoItem) => {
    setFavoriteRepos(favoriteRepos.filter((el: RepoItem) => el.id !== repo.id))
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <div className='rounded bg-red-800 px-4 py-2 font-bold text-white'>Error: {error.message}</div>
  }

  if (!repositories) {
    // TODO: improve style
    return <div>No data available</div>
  }

  const tableHeader = ['Stars', 'Repo Name', 'Description', 'Language', 'Favorite']

  return (
    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${isVisible ? '' : 'hidden'}`}>
      <h2 className='text-sm text-white'>
        Celestial Gems of the Last <strong>{DAYS_SPAN}</strong> Days
      </h2>
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
          {repositories.items.length > 0 ? (
            repositories.items.map((item: RepoItem) => (
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
            ))
          ) : (
            <div>No items found</div>
          )}
        </tbody>
      </table>
    </div>
  )
}
