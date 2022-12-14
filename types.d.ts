export interface Video {
    caption: string;
    comments: {
        comment: string;
        _key: string;
        postedBy: {
          _ref: string;
        };
    }[];
    likes: {
        postedBy: {
          _id: string;
          userName: string;
          image: string;
        };
    }[];
    postedBy: {
        _id: string;
        userName: string;
        image: string;
    };
    userId: string;
    video: {
      asset: {
        _id: string;
        url: string;
      };
    };
    _id: string;
  }
  
  export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
  }