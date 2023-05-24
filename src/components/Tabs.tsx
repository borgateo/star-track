import { Children, useState, ReactNode } from 'react'
import { Tab, TabType } from '../types/tab'

type TabProps = {
  tab: TabType
}
export const Tabs = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(TabType.REPOS)

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab)
  }

  const tabStyle =
    'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-300'
  const selectedTabStyle = 'active inline-block rounded-t-lg border-b-2 border-blue-500 p-4 text-blue-500'

  return (
    <div className='mx-auto max-w-screen-xl px-4'>
      <div id='tabs' className='border-b border-gray-700 text-center text-sm font-medium text-gray-400'>
        <ul className='-mb-px mt-10 flex flex-wrap'>
          {Children.map(children, (child, index) => {
            const tab = child as React.ReactElement<TabProps>

            return (
              <li className='mr-2' key={index}>
                <button
                  onClick={() => handleTabClick(tab.props.tab)}
                  className={tab.props.tab === activeTab ? selectedTabStyle : tabStyle}
                >
                  Repos
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div id='tab-content' className='mt-10'>
        {Children.map(children, (child) => {
          const tab = child as React.ReactElement<TabProps>

          return (
            <div key={tab.props.tab} style={{ display: tab.props.tab === activeTab ? 'block' : 'none' }}>
              {tab}
            </div>
          )
        })}
      </div>
    </div>
  )
}
