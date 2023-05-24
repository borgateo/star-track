import './styles/App.css'

import { TopBar } from './components/TopBar'
import { Favorites } from './components/Favorites'
import { RepoList } from './components/RepoList'
import { useState } from 'react'
import { TabType } from './types/repo'

function App() {
  const [currentTab, setCurrentTap] = useState<TabType>(TabType.Repos)

  const tabStyle =
    'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-300'
  const selectedTabStyle = 'active inline-block rounded-t-lg border-b-2 border-blue-500 p-4 text-blue-500'

  return (
    <div className='h-full min-h-screen bg-slate-900'>
      <TopBar />

      <div className='mx-auto max-w-screen-xl px-4'>
        <div className='border-b border-gray-700 text-center text-sm font-medium text-gray-400'>
          <ul className='-mb-px mt-10 flex flex-wrap'>
            <li className='mr-2'>
              <button
                onClick={() => setCurrentTap(TabType.Repos)}
                className={currentTab === 'repos' ? selectedTabStyle : tabStyle}
              >
                Repos
              </button>
            </li>
            <li className='mr-2'>
              <button
                onClick={() => setCurrentTap(TabType.Favorites)}
                className={currentTab === 'favorites' ? selectedTabStyle : tabStyle}
              >
                Favorites
              </button>
            </li>
          </ul>
        </div>

        <div className='mt-10' id='content'>
          <RepoList isVisible={currentTab === TabType.Repos} />
          <Favorites isVisible={currentTab === TabType.Favorites} />
        </div>
      </div>

      <footer className='bg-slate-900 pb-20 pt-10 text-center text-sm text-slate-600' id='footer'>
        Made by borgateo May 24th, 2023
      </footer>
    </div>
  )
}

export default App
