
export async function imageUpload(file, toastFunction) {
  let apiEndpoint = "https://api.cloudinary.com/v1_1/dpwq056hv/upload"
  const cloudFormData = new FormData();
  cloudFormData.append("file", file);
  cloudFormData.append("upload_preset", "talkify-profile");
  cloudFormData.append("cloud_name", "dpwq056hv");

  try {
    const imageUrl = await fetch(
      apiEndpoint,
      {
        method: "post",
        body: cloudFormData,
      }
    )
      .then(async(res) => {
        if (!res.ok) {
          // Handle the error case here
          const errorResponse = await res.json(); // Parse the error response
          throw new Error(errorResponse.error.message);
        }
        return res.json();
      })
      .then((cloudinaryResponse) => cloudinaryResponse.secure_url);

    console.log("Public URL:", imageUrl);

    return imageUrl; // Return the public image URL.
  } catch (Error) {
    console.log(Error);
    // Display an error toast with the error message
    toastFunction.error(Error.toString(), {
      position: 'top-right',
      autoClose: 5000,
    });
    // You can throw the error to handle it further if needed.
  }
}
