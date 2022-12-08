import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from "../utils/constants"

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const topicStyle = "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"
  const activeTopicStyle = "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]"

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-2'>
      <p className='hidden xl:block m-3 mt-4 text-gray-500 font-semibold'>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics.map((item) => (
          <Link key={item.name} href={`/?topic=${item.name}`}>
            <div className={topic == item.name ? activeTopicStyle : topicStyle}>
              <span className='font-bold text-2xl xl:text-md'>
                {item.icon}
              </span>
              <span className='hidden xl:block capitalize'>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover