import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect } from 'react'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import { IUser } from '../types'

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore()

useEffect(() => {
  fetchAllUsers();
}, [fetchAllUsers])


  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-400 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested Accounts
      </p>

      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex font-semibold rounded hover:bg-primary cursor-pointer gap-3 p-2'>
              <div className='h-8 w-8'>
                <Image src={user.image} width={34} height={34} className='rounded-full' alt='user profile' layout='responsive'></Image>
              </div>
              <div className='hidden xl:block'>
                <p className='flex gap-1 text-md text-primary mr-1 lowercase items-center'>
                  {user.userName.replaceAll(' ', '')}
                  <GoVerified className='text-blue-400'/>
                </p>
                <p className='text-xs text-gray-400 capitalize'>{user.userName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts