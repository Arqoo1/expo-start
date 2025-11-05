import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const updateProfile = (updatedFields) => {
    setLoggedInUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const registerUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setLoggedInUser(newUser);
  };

  const loginUser = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setLoggedInUser(user);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setLoggedInUser(null);
  };

  return (
    <ProfileContext.Provider
      value={{
        users,
        loggedInUser,
        updateProfile,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
