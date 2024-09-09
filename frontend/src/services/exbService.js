const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

///////////////////////////
// Get | Get All Exhibitions
///////////////////////////
export const getAllExhibitions = async (userId) => {
  let url = `${BACKEND_URL}/exhibitions/explore/${userId}`;
  // if(userId === undefined){
  //   url = `${BACKEND_URL}/exhibitions/explore`
  // } else {
  //   url = `${BACKEND_URL}/exhibitions/explore/${userId}`
  // }
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get all exhibitions`);
  }
};

///////////////////////////
// Get | Get User Exhibitions
///////////////////////////
export const getUserExhibitions = async (userId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/dashboard/${userId}`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get user exhibitions`);
  }
};

///////////////////////////
// Get | Get Detail Exhibitions
///////////////////////////
export const getExbDetail = async (id) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/${id}`
      //   options
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get exhibition detail`);
  }
};

///////////////////////////
// Get | Exb Artworks
///////////////////////////
export const getExbArtworks = async (exbId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/view-artworks/${exbId}`
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get exhibition artworks`);
  }
};

///////////////////////////
// ! DELETE | Delete Exhibition
///////////////////////////
export const deleteExb = async (exbId) => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/${exbId}`,
      options
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to delete exhibition`);
  }
};

///////////////////////////
// ? POST | create Exhibition
///////////////////////////
export const createExb = async (formData) => {
  console.log(formData, " <formdata");
  // Function to add one day to a given date string
  function addOneDay(dateString) {
    const date = new Date(dateString); // Parse the string into a Date object
    date.setDate(date.getDate() + 1); // Increment the date by 1 day
    return date.toISOString().split("T")[0]; // Convert back to string in YYYY-MM-DD format
  }
  formData.startDate = addOneDay(formData.startDate);
  formData.endDate = addOneDay(formData.endDate);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  try {
    const response = await fetch(`${BACKEND_URL}/exhibitions`, options);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to create an exhibition`);
  }
};
///////////////////////////
// * PUT | edit Exhibition
///////////////////////////
export const editExb = async (formData, exbId) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/${exbId}`,
      options
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to update exhibition`);
  }
};

///////////////////////////
// ? POST | add artwork to Exhibition
///////////////////////////
export const postAddArtworkToExb = async (exbId, objectid) => {
  const params = {
    exbId,
    objectid,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/${exbId}/add-artwork/${objectid}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to create through table row`);
  }
};

///////////////////////////
// ! DELETE | remove artwork from Exhibition
///////////////////////////
export const removeArtworkFromExb = async (exbId, objectid) => {
  const params = {
    exbId,
    objectid,
  };
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/${exbId}/remove-artwork/${objectid}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to create through table row`);
  }
};

///////////////////////////
// GET | cover img exb
///////////////////////////

export const getCoverImg = async (exbId) => {
  console.log(exbId);
  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/${exbId}/cover-img`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get cover img exb`);
  }
};
