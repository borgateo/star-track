import { useLocalStorage } from '../hooks/useLocalStorage'
import { RepoItem } from '../types/repo'

import removeIcon from '../assets/remove.png'

export const Favorites = ({ isVisible = true }: { isVisible?: boolean }) => {
  const [favoriteRepos, setFavoriteRepos] = useLocalStorage('favoriteRepos', [])

  const tableHeader = ['Stars', 'Repo Name', 'Description', 'Language', 'Favorite']

  const removeFavoriteRepo = (repo: RepoItem) => {
    setFavoriteRepos(favoriteRepos.filter((el: RepoItem) => el.id !== repo.id))
  }

  return (
    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${isVisible ? '' : 'hidden'}`}>
      <h2 className='text-sm text-white'>Favorite Celestial Gems</h2>
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
          {favoriteRepos.length > 0 ? (
            favoriteRepos.map((item: RepoItem) => (
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
                  <button
                    className='font-medium text-blue-500 hover:underline'
                    onClick={() => removeFavoriteRepo(item)}
                  >
                    <img className='h-8 w-8' src={removeIcon} alt='remove from favorites' />
                  </button>
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
