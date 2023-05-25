import { Avatar } from './Avatar'

export const TopBar = () => {
  // FIXME: mock data
  // out of scope: if I add a Auth system, I could use the real user data here
  const userData = {
    id: 21312,
    name: 'Matt Borgato',
    email: 'hello@matteoborgato.com',
    initials: 'MB',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1117347?v=4',
  }

  return (
    <nav className='border-slate-200 bg-slate-700'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <a href='https://startrackgh.netlify.app/' className='flex items-center'>
          <span className='self-center whitespace-nowrap font-mono text-3xl font-semibold text-white'>Star Track</span>
        </a>
        <span className='invisible self-center whitespace-nowrap pl-5 font-mono text-sm text-slate-300 md:visible'>
          Github&apos;s Stellar Repositories
        </span>

        <Avatar name={userData.name} email={userData.email} avatarUrl={userData.avatarUrl} />
      </div>
    </nav>
  )
}
