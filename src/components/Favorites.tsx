import { useState } from 'react'

export const Favorites = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
              <th scope='col' className='p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-all-search'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label for='checkbox-all-search' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </th>
              <th scope='col' className='px-6 py-3'>
                Product name
              </th>
              <th scope='col' className='px-6 py-3'>
                Color
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-search-1'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label for='checkbox-table-search-1' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                Apple MacBook Pro 17"
              </th>
              <td className='px-6 py-4'>Silver</td>
              <td className='px-6 py-4'>Laptop</td>
              <td className='px-6 py-4'>$2999</td>
              <td className='px-6 py-4'>
                <a href='#' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                  Edit
                </a>
              </td>
            </tr>
            <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-search-2'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label for='checkbox-table-search-2' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                Microsoft Surface Pro
              </th>
              <td className='px-6 py-4'>White</td>
              <td className='px-6 py-4'>Laptop PC</td>
              <td className='px-6 py-4'>$1999</td>
              <td className='px-6 py-4'>
                <a href='#' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </nav>
  )
}
