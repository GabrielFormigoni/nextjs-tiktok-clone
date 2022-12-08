import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from "../utils/constants"

const Discover = () => {
  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-2'>
      <p className='hidden xl:block m-3 mt-4 text-gray-500 font-semibold'>
        Popular Topics
      </p>
    </div>
  )
}

export default Discover