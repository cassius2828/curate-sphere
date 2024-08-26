const PROFILES_BASE_URL = import.meta.env.VITE_BACKEND_URL + "/profiles";

///////////////////////////
// * PUT | Update User Info
///////////////////////////
export const updateUserInfo = async (formData, userId) => {
  const options = {
    method: "PUT",
    body: formData,
  };
  try {
    const response = await fetch(
      PROFILES_BASE_URL + "/update-info/" + userId,
      options
    );
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    console.log(data, " <-- update user info data");
    return data;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to communciate with backend to update user info. Error: ${err}`
    );
  }
};

///////////////////////////
// * PUT | Update User Password
///////////////////////////
export const updateUserPassword = async (
  currentPassword,
  newPassword,
  confirmPassword,
  userId
) => {
  const params = {
    currentPassword,
    newPassword,
    confirmPassword,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(params),
  };
  try {
    const response = await fetch(
      PROFILES_BASE_URL + "/update-password/" + userId,
      options
    );
    const data = await response.json();
  
    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with backend to update user password`);
  }
};

///////////////////////////
// * PUT | Update User Profile Img | Profile Pic or Header
///////////////////////////

export const updateUserImgsByArtworkUrl = async (imgUrl, imgType, userId) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imgUrl }),
  };
  try {
    const response = await fetch(
      `${PROFILES_BASE_URL}/update-imgs/${userId}?imgType=${imgType}`,
      options
    );
    const data = await response.json();
    // plan on returning message | succuess or fail
    console.log(data, " <-- data fromimg updates");
    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with backend to update ${imgType}`);
  }
};
