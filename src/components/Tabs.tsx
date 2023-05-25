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
    'inline-block capitalize rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-300'
  const selectedTabStyle = 'active capitalize inline-block rounded-t-lg border-b-2 border-blue-500 p-4 text-blue-500'

  return (
    <div className='mx-auto max-w-screen-xl px-4'>
      <div className='border-b border-gray-700 text-center text-sm font-medium text-gray-400'>
        <ul className='-mb-px mt-10 flex flex-wrap' role='tablist'>
          {Children.map(children, (child, index) => {
            const tab = child as React.ReactElement<TabProps>

            return (
              <li className='mr-2' key={index} role='tab' aria-selected={tab.props.tab === activeTab}>
                <button
                  onClick={() => handleTabClick(tab.props.tab)}
                  className={tab.props.tab === activeTab ? selectedTabStyle : tabStyle}
                >
                  {tab.props.tab}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className='tab-content mt-10' role='tabpanel' aria-labelledby={`${activeTab}-tab`}>
        {Children.toArray(children).find((child) => (child as React.ReactElement<TabProps>).props.tab === activeTab)}
      </div>
    </div>
  )
}
