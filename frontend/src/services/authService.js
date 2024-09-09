const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

///////////////////////////
// Get User
///////////////////////////
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = JSON.parse(atob(token.split(".")[1]));
  return user;
};

///////////////////////////
// Register
///////////////////////////
const register = async (formData) => {
  // options
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  try {
    const res = await fetch(`${BACKEND_URL}/auth/register`, options);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Something went wrong");
    }
    localStorage.setItem("token", json.token);
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

///////////////////////////
// Login
///////////////////////////
const login = async (user) => {
  // options
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, options);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Something went wrong");
    }
    if (json.token) {
      localStorage.setItem("token", json.token);
      try {
        const user = JSON.parse(atob(json.token.split(".")[1]));
        return user;
      } catch (error) {
        throw new Error("Failed to decode token");
      }
   
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

///////////////////////////
// Sign Out
///////////////////////////
const signout = () => {
  localStorage.removeItem("token");
};

export { register, login, getUser, signout };
