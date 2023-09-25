import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { imageUpload } from "controller/imageUpload";
import { toast } from "react-toastify";
import { getRandomName } from "controller/nameGenerator";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string(),
  occupation: yup.string(),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const imageUrls = [
  "https://res.cloudinary.com/dpwq056hv/image/upload/v1695522993/tqe8toea5z7wntvxohv9.jpg",
  "https://res.cloudinary.com/dpwq056hv/image/upload/v1695522798/yt5ggvyvs9cqpbmfiimm.jpg",
  "https://res.cloudinary.com/dpwq056hv/image/upload/v1695522656/jq0da95x5nv9pith8wzi.jpg",
  "https://res.cloudinary.com/dpwq056hv/image/upload/v1695522573/yhrdk8etfhzj3vmgqcus.jpg",
  "https://res.cloudinary.com/dpwq056hv/image/upload/v1695522510/xvwq2vuomhu2uytink4d.jpg",
  "https://res.cloudinary.com/dpwq056hv/image/upload/v1695493402/ikvt7oelagamk2avkvts.png"
];

// Generate a random index
const randomIndex = Math.floor(Math.random() * imageUrls.length);

// Get the random URL
const randomImageUrl = imageUrls[randomIndex];

  const register = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      if (!values.picture){
          formData.append("picturePath", randomImageUrl);
        }else {

            const imageUrl = await imageUpload(values.picture, toast); // Add toast here
            formData.append("picturePath", imageUrl);
        }
       if (!values.location) {
      formData.append("location", getRandomName("planet"));
    }

    if (!values.occupation) {
      formData.append("occupation", getRandomName("occupation"));
    }

      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_SERVER}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (savedUserResponse.ok) {
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if (savedUser) {
          setPageType("login");
          // Display a success toast message
          toast.success("Registration successful!", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } else {
        // Registration failed, handle the error
        // Display an error toast message
        const savedUser = await savedUserResponse.json();
        toast.error(savedUser.error, {
          position: "top-right",
          autoClose: 5000,
        });
        return
      }
    } catch (error) {
      console.error("Error:", error);
      // Display an error toast message
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const login = async (values, onSubmitProps) => {
  try {
    const loggedInResponse = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (loggedInResponse.ok) {
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } else {
      // Login failed, handle the error
      // Display an error toast message at the bottom center
      toast.error("Login failed. Please check your credentials and try again.", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    // Display an error toast message at the bottom center
    toast.error("An error occurred. Please try again later.", {
      position: "bottom-center",
      autoClose: 5000,
    });
  }
 };
 const guestLogin = async ( onSubmitProps) => {
  try {
    const loggedInResponse = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "guest@login.com", password: "123456789"}),
    });

    if (loggedInResponse.ok) {
      const loggedIn = await loggedInResponse.json();
    //   onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } else {
      // Login failed, handle the error
      // Display an error toast message at the bottom center
      toast.error("Login failed. Please check your credentials and try again.", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    // Display an error toast message at the bottom center
    toast.error("An error occurred. Please try again later.", {
      position: "bottom-center",
      autoClose: 5000,
    });
  }
 };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            
          </Box>

          {/* BUTTONS */}
          <Box>
            <FlexBetween >

            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 1rem 2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                
            }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Button
          fullWidth
          type="button"
          onClick={guestLogin}
          sx={{
            m: "1rem 0",
            p: "0.9rem",
            backgroundColor: '#B4B4B3',
            color: palette.background.alt,
            "&:hover": { color: palette.secondary.main },
            maxWidth: '20%',
          }}
        >
          GUEST LOGIN
        </Button>
                </FlexBetween>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
            
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;