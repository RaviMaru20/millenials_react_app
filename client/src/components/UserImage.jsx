import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  // Check if 'image' is defined before using the 'replace' method
  const modifiedUrl = image ? image.replace(/\/upload\//, `/upload/c_fill,w_${100},h_${100}/`) : '';
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${modifiedUrl}`}
      />
    </Box>
  );
};

export default UserImage;
