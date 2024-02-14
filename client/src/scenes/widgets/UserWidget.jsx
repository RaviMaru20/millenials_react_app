import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, MenuItem, Menu } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "controller/imageUpload";
import { setLogin, setProfilePicture } from "state";
import { useDispatch } from 'react-redux';
import { API_URL } from "controller/urlObj";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch(); 
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [anchorEl, setAnchorEl] = useState(null); // State to anchor the menu
  const [newPicture, setNewPicture] = useState(null); // State to store the new profile picture
  // ... other state and variables

  const handlePictureUpload = async (acceptedFiles) => {
    // ... Same code as before for image upload
    const updatedProfilePicture = await imageUpload(acceptedFiles[0]);
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ picturePath: updatedProfilePicture }),
    });

    if (response.ok) {
      // Successfully updated the profile picture on the server
      const { picturePath } = await response.json()
      console.log("New picturePath:", picturePath); 
      dispatch(setLogin({
          user: {
            ...user, // Include other user data
            picturePath: picturePath, // Update the picturePath
          },
          token: token,
        }));
        dispatch(setProfilePicture({ userId, picturePath }));
    } else {
      // Handle error if the image upload fails
      console.error("Image upload failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  };

  const openFileUploader = () => {
    // Trigger the file input element when the icon is clicked
    const fileInput = document.getElementById("profile-picture-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleMenuOpen = (event) => {
    // Open the menu and anchor it to the icon
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    // Close the menu
    setAnchorEl(null);
  };
  const getUser = async () => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [newPicture]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              onClick={() => navigate(`/profile/${userId}`)}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <Box>
        {/* Add an invisible file input element */}
        <input
          type="file"
          id="profile-picture-input"
          style={{ display: "none" }}
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handlePictureUpload(e.target.files)}
        />
        {loggedInUserId === userId && (
  <ManageAccountsOutlined
    onClick={handleMenuOpen}
    sx={{ color: main, cursor: "pointer" }}
  />
)}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={openFileUploader}>
            <Typography>Edit Profile Picture</Typography>
          </MenuItem>
          {/* Add more options as needed */}
        </Menu>
      </Box>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>
                  Social Network
                </Typography>
              </Box>
            </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;