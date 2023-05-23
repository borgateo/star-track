import './styles/App.css'

import { TopBar } from './components/TopBar'
import { Favorites } from './components/Favorites'
import { RepoList } from './components/RepoList'

function App() {
  return (
    <div className='h-screen bg-slate-900'>
      <TopBar />
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <RepoList />
        <Favorites />
      </div>
    </div>
  )
}

export default App
