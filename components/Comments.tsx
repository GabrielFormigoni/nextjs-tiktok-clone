import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";
import { BASE_URL } from "../utils";

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
  isPostingComment: Boolean;
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers }: any = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px] mb-[100px]">
      <div className="overflow-scrol lg:h-[457px]">
        {comments?.length ? (
          comments.map((item, i) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={i}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-center gap-3 cursor-pointer">
                          <div className="h-8 w-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
                            ></Image>
                          </div>
                          <div>
                            <p className="flex gap-1 text-md text-primary mr-1 lowercase items-center">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="text-xs text-gray-400 capitalize">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div>
                        <p>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-4 md:px-10 w-full">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
