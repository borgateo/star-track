export const LoadingSkeleton = ({ rows = 10 }: { rows?: number }) => (
  <div className='mt-10 w-full'>
    {Array.from({ length: rows }, (_, index) => (
      <div className='mb-5 h-4 animate-pulse bg-gray-700' key={index}></div>
    ))}
    <span className='sr-only'>Loading...</span>
  </div>
)
