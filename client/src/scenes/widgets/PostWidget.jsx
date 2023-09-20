import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Input, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
  showButton,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [isMuted, setIsMuted] = useState(true);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
const [isPlaying, setIsPlaying] = useState(true);
const videoRef = useRef(null);
const [newComment, setNewComment] = useState(""); // State to store the new comment
const [isAddingComment, setIsAddingComment] = useState(false); // State to toggle comment input field

  const handleCommentInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return; // Prevent adding empty comments
    }

    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, comment: newComment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));

    // Clear the comment input field and hide it
    setNewComment("");
    setIsAddingComment(false);
  };
const togglePlayPause = () => {
  const video = videoRef.current;
  if (video) {
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }
};

const toggleMuteUnmute = () => {
  const video = videoRef.current;
  if (video) {
    video.muted = !video.muted; // Toggle the muted property
    setIsMuted(video.muted);
  }
};
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        showButton={!showButton}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
  <>
    {picturePath.endsWith('.mp3') ? (
      // MP3 audio rendering
      <audio controls style={{ width: '100%', marginTop: '0.75rem' }}>
        <source src={`http://localhost:3001/assets/${picturePath}`} type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    ) : picturePath.endsWith('.mp4') ? (
      // Video rendering
      <div style={{ position: 'relative', width: '100%', marginTop: '0.75rem' }}>
        <video
          autoPlay
          muted={isMuted}
          controls={false}
          style={{ width: '100%' }}
          onClick={togglePlayPause}
          loop
          ref={videoRef}
        >
          <source
            src={`http://localhost:3001/assets/${picturePath}`}
            type='video/mp4'
          />
          Your browser does not support the video element.
        </video>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={toggleMuteUnmute} // Add click handler to toggle mute/unmute
        >
          {isMuted ? 'Unmute' : 'Mute'} | {isPlaying ? 'Tap to pause' : 'Tap to play'}
        </div>
      </div>
    ) : (
      // Image rendering
      <img
        width="100%"
        height="auto"
        alt="post"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        src={`http://localhost:3001/assets/${picturePath}`}
      />
    )}
  </>
)}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
          <Typography>{createdAt}</Typography>
        </FlexBetween>
                
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
  <Box mt="0.5rem">
    {comments.map((commentObject, index) => (
  <Box key={index}>
    <Divider />
    <Typography variant="h6" sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
      {commentObject.userId}
    </Typography>
    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
      Comment: {commentObject.comment}
    </Typography>
  </Box>
))}
    <Divider />

    {/* Comment input field */}
    <Box mt="0.5rem">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: palette.neutral.light, // Match the theme color
          borderRadius: "2rem",
          padding: "0.5rem 1rem",
        }}
      >
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentInputChange}
          fullWidth
          onFocus={() => setIsAddingComment(true)}
          sx={{ flex: 1, mr: "0.25rem" }}
        />
        {isAddingComment && (
          <IconButton
            onClick={handleAddComment}
            sx={{
              backgroundColor: "#E57C23", // Match the theme color
              color: palette.background.alt, // Text color
              borderRadius: "2rem",
              padding: "0.55rem",
              fontSize: "0.8rem"
            }}
          >
            Post
          </IconButton>
        )}
      </Box>
    </Box>
  </Box>
)}
    </WidgetWrapper>
  );
};

export default PostWidget;