
import axios from "axios"
import NoResults from "../components/NoResults"
import VideoCard from "../components/VideoCard"
import { Video } from "../types"
interface IProps {
  videos: Video[]
}

const Home = ( { videos }: IProps ) => {
  console.log(videos)

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? videos.map((item: Video) => (
        <VideoCard post={item} key={item._id} />
      )) : (
        <NoResults text={'No Videos'} />
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`)

  console.log(data.name)

  return {
    props:{
      videos: data
    }
  }
}

export default Home