import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { GoVerified } from "react-icons/go";

import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";

interface IProps {
  data: {
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}
const Profile = ({ data }: IProps) => {
  const {user, userVideos, userLikedVideos} = data;
  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videosList, setVideosList] = useState<Video[]>([])

  useEffect(() => {
    if(showUserVideos) {
      setVideosList(userVideos)
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])
  

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-200"
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-200"

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 items-center mb-4 bg-white">
        <div className='h-16 w-16 md:w-32 md:h-32'>
          <Image src={user.image} width={120} height={120} className='rounded-full' alt='user profile' layout='responsive'></Image>
        </div>
        <div>
          <p className='flex gap-1 text-md md:text-2xl tracking-wider font-bold text-primary mr-1 lowercase items-center'>
            {user.userName.replaceAll(' ', '')}
            <GoVerified className='text-blue-400'/>
          </p>
          <p className='text-xs text-gray-400 md:text-xl capitalize'>{user.userName}</p>
        </div>
      </div>

      <div>
        <div className="border-b-2 p-0 flex gap-10 mb-10 mt-10 border-gray-200 bg-white w-full">
          <p 
            className={`text-xl font-semibold cursor-pointer mt-[2px] ${videos}`}
            onClick={() => setShowUserVideos(true)}>
              Videos
          </p>
          <p 
            className={`text-xl font-semibold cursor-pointer mt-[2px] ${liked}`}
            onClick={() => setShowUserVideos(false)}>
              Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start ">
          {videosList.length > 0 ? (
            videosList.map((post: Video, i: number) => (
                <VideoCard post={post} key={i} />
            ))
          ) : (
              <NoResults text={`No ${showUserVideos ? 'Videos' : 'Liked Videos'} yet`}/>
          )}
        </div>
      </div>

    </div>
)
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return { 
      props: {
      data: res.data
      }
    }
};

export default Profile;
