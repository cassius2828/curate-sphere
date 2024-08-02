const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

///////////////////////////
// Get | Get All Exhibitions
///////////////////////////
export const getAllExhibitions = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/exhibitions`);
    const data = await response.json();
    console.log(data)
    if (data.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get all exhibitions`);
  }
};
