import './styles/App.css'

import { TopBar } from './components/TopBar'
import { Favorites } from './components/Favorites'
import { RepoList } from './components/RepoList'

import { Tabs } from './components/Tabs'
import { TabType } from './types/tab'

function App() {
  return (
    <div className='h-full min-h-screen bg-slate-900'>
      <TopBar />

      <Tabs>
        <RepoList tab={TabType.REPOS} />
        <Favorites tab={TabType.FAVORITES} />
      </Tabs>

      <footer className='bg-slate-900 pb-20 pt-10 text-center text-sm text-slate-600' role='contentinfo'>
        Made by borgateo &mdash; last update May 25th, 2023
      </footer>
    </div>
  )
}

export default App
