import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post: { caption, postedBy, video, _id, likes } }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if(isPlaying){
      videoRef?.current?.pause();
      setIsPlaying(false)
    }
    else{
      videoRef?.current?.play();
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if(videoRef?.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])
  
  return (

    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div>
        <div className="flex gap-3 font-semibold rounded p-2 cursor-pointer">
          <div className="md:w-16 md:h-16 h-10 w-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={postedBy?.image}
                  alt="profile-pic"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="">
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 font-bold text-primary">
                  {postedBy.userName}
                  <GoVerified className="text-blue-400 text-md"/>
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                {postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div className="rounded-3xl" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <Link href={`/detail/${_id}`}>
            <video
              ref={videoRef}
              loop
              className="lg:w-[600px] lg:h-[530px] md:h-[400px] h-[300px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              src={video.asset.url}
            >

            </video>
          </Link>
          {isHovering && (
            <div className="flex relative bottom-[60px] justify-between pl-6 pr-6">
              {isPlaying ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl"/>
                  </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl"/>
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setIsMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl"/>
                </button>
              ) : (
                <button onClick={() => setIsMuted(true)}>
                  <HiVolumeUp  className="text-black text-2xl lg:text-4xl"/>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
