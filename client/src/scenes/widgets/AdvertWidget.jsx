import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <a
    href="https://www.linkedin.com/in/ravi-maru" // Replace with your LinkedIn profile URL
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}>

    <WidgetWrapper>
    <FlexBetween >
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Developer</Typography>
        </FlexBetween>
<div style={{ overflow: "hidden", paddingTop: "1rem", paddingBottom: "1rem", borderRadius: "0.75rem", margin: "0.5rem 0" }}>

        <img
        width="100%"
        height="auto"
        alt="advert"
        src={`https://res.cloudinary.com/dpwq056hv/image/upload/v1695612164/ctcyvmqnmzro6vzgdn7c.jpg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0",transform: "scale(2.0)", }}
        
        />
        </div>
        <FlexBetween>
        <Typography color={main} sx={{ fontWeight: 'bold' }}>Ravi Maru</Typography>
        <Typography color={medium}>linkedin.com/in/ravi-maru</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        "🌌 Explore the cosmic journey of the developer beyond the code! Connect with me on LinkedIn to uncover the secrets of the software universe. 🚀🌟 #DeveloperLife"
      </Typography>
    </WidgetWrapper>
    </a>
    );
};

export default AdvertWidget;