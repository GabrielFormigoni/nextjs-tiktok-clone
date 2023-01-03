import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SanityAssetDocument } from "@sanity/client";

import axios from "axios";

import { client } from "../utils/client";
import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

const handlePost = async () => {
  if(caption && category && videoAsset?._id){
    setSavingPost(true)

    const document = {
      _type: "post",
      caption,
      video: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: videoAsset?._id
        }
      },
      userId: userProfile?._id,
      postedBy: {
        _type: "postedBy",
        _ref: userProfile?._id
      },
      topic: category
    }

    await axios.post('http://localhost:3000/api/post', document);

    router.push('/');
  }
}

const clear = () => {
  setCaption("")
  setCategory("")
  setVideoAsset(undefined)
}

  return (
    <div className="flex h-full w-full absolute bg-[#F8F8F8] left-0 top-[60px] pt-10 mb-10 lg:pt-20 justify-center">
      <div className="bg-white rounded-lg md:w-[60%] w-[100%] xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div
            className="border-dashed rounded-xl border-4 border-gray-200 flex 
                          flex-col justify-center items-center outline-none mt-10 w-[260px]
                          h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100"
          >
            {isLoading ? (
              <p>Uploading</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="h-[450px] rounded-xl bg-black"
                    />
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-gray-500 text-xl font-semibold">
                          Upload video
                        </p>
                      </div>
                      <p className="mt-10 leading-10 text-gray-400 text-sm text-center">
                        MP4, WebM or ogg <br />
                        720x1080 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p
                        className="bg-[#F51997] text-center mt-10 rounded text-white
                                    text-md font-medium p-2 w-52 outline-none"
                      >
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="w-[250px] mt-4 font-semibold text-center text-xl text-red-400">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="font-medium text-base">Caption</label>
          <input
            type="text"
            className="border-2 p-2 rounded border-gray-200 outline-none text-md"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label className="font-medium text-base">Choose a category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none border-2 capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300 rounded cursor-pointer"
          >
            {topics.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={clear}
              className="border-gray-300 border-2 font-medium text-base rounded p-2 w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              className="bg-[#F51997] text-white font-medium text-base rounded p-2 w-28 lg:w-44 outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
