import  { createContext, useState,  } from 'react';
import { getUser, signout } from '../services/authService';


// Create a Context
const GlobalContext = createContext();

// Create a Provider component
export const GlobalProvider = ({ children }) => {
// * artworks state | fetch from api, set state, pass that state to our compoennts 
// * on filter / search, that function will fire again, which will change our state

// user state | retrieve the user, set them to local storage, 
const [user, setUser] = useState(getUser())
// console.log(user)

const handleSignout = () => {
  signout()
  setUser(null)
}

// useEffect(() => {
//   as
// })

// showing our exb | set exhibitions | set exhibition detail | create, delete, edit

  return (
    <GlobalContext.Provider value={{user, setUser, handleSignout}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
