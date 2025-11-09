import { createContext, useReducer } from "react";

export const ProfileContext = createContext();

const initialState = {
  users: [],
  loggedInUser: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        users: [...state.users, action.payload],
        loggedInUser: action.payload,
      };
    case "LOGIN":
      const foundUser = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      return foundUser ? { ...state, loggedInUser: foundUser } : state;
    case "LOGOUT":
      return { ...state, loggedInUser: null };
    case "UPDATE_PROFILE":
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const registerUser = (newUser) =>
    dispatch({ type: "REGISTER", payload: newUser });

  const loginUser = (email, password) => {
    dispatch({ type: "LOGIN", payload: { email, password } });
    const user = state.users.find(
      (u) => u.email === email && u.password === password
    );
    return !!user;
  };

  const logoutUser = () => dispatch({ type: "LOGOUT" });

  const updateProfile = (updatedFields) =>
    dispatch({ type: "UPDATE_PROFILE", payload: updatedFields });

  return (
    <ProfileContext.Provider
      value={{
        users: state.users,
        loggedInUser: state.loggedInUser,
        registerUser,
        loginUser,
        logoutUser,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
