import React from 'react'

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <div className="text-center p-6 rounded-lg shadow bg-white dark:bg-neutral-800">
          <div className="animate-pulse h-4 w-48 bg-gray-200 dark:bg-neutral-700 mb-4 rounded"></div>
          <div className="text-sm text-gray-500 dark:text-neutral-300">
            Loading admin data...
          </div>
        </div>
      </div>    
  )
}

export default Loader