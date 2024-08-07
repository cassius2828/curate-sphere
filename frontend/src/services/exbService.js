const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

///////////////////////////
// Get | Get All Exhibitions
///////////////////////////
export const getAllExhibitions = async (userId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/exhibitions/explore/${userId}`
    );
    const data = await response.json();
    // console.log(data, ' <-- non user exbs');
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
    // console.log(data);
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
// Get | Get Detail Exhibitions
///////////////////////////
export const getExbDetail = async (id) => {
  //   const options = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
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
    // console.log(data);
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
  console.log(exbId, " <-- id");
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
    // console.log(data);
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
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  try {
    const response = await fetch(`${BACKEND_URL}/exhibitions`, options);
    const data = await response.json();
    // console.log(data);
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
    // console.log(data);
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
    const response = await fetch(`${BACKEND_URL}/exhibitions/${exbId}/add-artwork/${objectid}`, options);
    const data = await response.json();
    console.log(response);
   
      return data;
  
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to create through table row`);
  }
};
