interface User {
  id: number
  name: string
  email: string
  avatarUrl: string
}

type AvatarProps = Omit<User, 'id'>

export const Avatar = ({ name, email, avatarUrl }: AvatarProps) => {
  // TODO: show initials if the avatarUrl is not available
  return (
    <div className='flex items-center space-x-4'>
      <img className='h-10 w-10 rounded-full' src={avatarUrl} alt='avatar' />
      <div className='font-medium dark:text-white'>
        <div>{name}</div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>{email}</div>
      </div>
    </div>
  )
}
