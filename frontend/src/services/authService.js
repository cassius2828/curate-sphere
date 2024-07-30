const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;


const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
}

const register = async (formData) => {
    try {
    //   const res = await fetch(`${BACKEND_URL}/auth/register`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   const json = await res.json();
    //   if (!res.ok) {
    //     throw new Error(json.error || 'Something went wrong');
    //   }
    // //   localStorage.setItem('token', json.token);
    //   return json;
        const res = await fetch(`${BACKEND_URL}/auth/register`)

    } catch (err) {
      throw new Error(err);
    }
  };
  
  const login = async (user) => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Something went wrong');
      }
      if (json.token) {
        localStorage.setItem('token', json.token);
        try {
          const user = JSON.parse(atob(json.token.split('.')[1]));
          return user;
        } catch (error) {
          throw new Error('Failed to decode token')
        }
      }
    // const res = await fetch(`${BACKEND_URL}/auth/register`)

    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  const signout = () => {
    localStorage.removeItem('token');
  };
  
  export { register, login, getUser, signout };