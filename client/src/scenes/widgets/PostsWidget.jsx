import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { API_URL } from "controller/urlObj";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);  
  const getPosts = async () => {
    const response = await fetch(`${API_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${API_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  const formatCreatedAt= (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;
    const millisecondsInHour = 60 * 60 * 1000;
    const millisecondsInDay = 24 * millisecondsInHour;

    if (timeDifference < millisecondsInHour) {
        // Within the last hour, display in minutes
        const minutesAgo = Math.floor(timeDifference / (60 * 1000));
        return `${minutesAgo} mins ago`;
    } else if (timeDifference < millisecondsInDay) {
        // Within the last 24 hours, display in hours
        const hoursAgo = Math.floor(timeDifference / millisecondsInHour);
        return `${hoursAgo} hrs ago`;
    } else {
        // More than 24 hours ago, display in the "DD MMM YYYY" format
        const options = { year: "numeric", month: "short", day: "numeric" };
        return createdDate.toLocaleDateString(undefined, options);
    }
}

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
  <>
    {posts
      .slice() // Create a shallow copy of the posts array
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort the copied array by createdAt in descending order
      .map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={formatCreatedAt(createdAt)}
            showButton={userId===loggedInUserId}
          />
        )
      )}
  </>
);
};

export default PostsWidget;