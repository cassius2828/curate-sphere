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
   if(data.token){
    localStorage.setItem("token", data.token);

   }
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
export const updateUserPassword = async (formData, userId) => {
  const options = {
    method: "PUT",
    body: formData,
  };
  try {
    const response = await fetch(
      PROFILES_BASE_URL + "/update-password/" + userId,
      options
    );
    const data = await response.json();
    if (data.message) {
      return data.message;
    }
    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with backend to update user password`);
  }
};
