// import { createContext, useReducer, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const ProfileContext = createContext();

// const initialState = {
//   users: [],
//   loggedInUser: null,
// };

// const profileReducer = (state, action) => {
//   console.log("Reducer Action:", action.type, action.payload);

//   switch (action.type) {
//     case "REGISTER":
//       return {
//         ...state,
//         users: [...state.users, action.payload],
//         loggedInUser: action.payload,
//       };
//     case "LOGIN":
//       const foundUser = state.users.find(
//         (u) =>
//           u.email === action.payload.email &&
//           u.password === action.payload.password
//       );
//       return foundUser ? { ...state, loggedInUser: foundUser } : state;
//     case "LOGOUT":
//       return { ...state, loggedInUser: null };
//     case "UPDATE_PROFILE":
//       return {
//         ...state,
//         loggedInUser: {
//           ...state.loggedInUser,
//           ...action.payload,
//         },
//       };
//     case "SET_USER":
//       return { ...state, loggedInUser: action.payload };
//     case "SET_USERS":
//       return { ...state, users: action.payload };
//     default:
//       return state;
//   }
// };

// export const ProfileProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(profileReducer, initialState);

//   // Load from AsyncStorage
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("loggedInUser");
//         const storedUsers = await AsyncStorage.getItem("users");
//         if (storedUsers) {
//           dispatch({
//             type: "SET_USERS",
//             payload: JSON.parse(storedUsers),
//           });
//         }

//         if (storedUser) {
//           dispatch({
//             type: "SET_USER",
//             payload: JSON.parse(storedUser),
//           });
//         }
//       } catch (error) {
//         console.log("Error loading from AsyncStorage:", error);
//       }
//     };

//     loadData(); // Call the async function safely inside useEffect
//   }, []);

//   const persistData = async (users, loggedInUser) => {
//     try {
//       await AsyncStorage.setItem("users", JSON.stringify(users));
//       await AsyncStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
//       console.log("Saved to AsyncStorage:", { users, loggedInUser });
//     } catch (error) {
//       console.log("Error saving to AsyncStorage:", error);
//     }
//   };

//   const registerUser = async (newUser) => {
//     console.log("Registering user:", newUser);
//     dispatch({ type: "REGISTER", payload: newUser });
//     const updatedUsers = [...state.users, newUser];
//     await persistData(updatedUsers, newUser);
//   };

//   const loginUser = async (email, password) => {
//     console.log("Trying to log in with:", { email, password });
//     const foundUser = state.users.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (foundUser) {
//       dispatch({ type: "LOGIN", payload: { email, password } });
//       await AsyncStorage.setItem("loggedInUser", JSON.stringify(foundUser));
//       console.log("Login success:", foundUser);
//       return true;
//     }
//     console.log("Login failed – no matching user found");
//     return false;
//   };

//   const logoutUser = async () => {
//     dispatch({ type: "LOGOUT" });
//     await AsyncStorage.removeItem("loggedInUser");
//     console.log("User logged out and removed from AsyncStorage");
//   };

//   const updateProfile = async (updatedFields) => {
//     const updatedUser = {
//       ...state.loggedInUser,
//       ...updatedFields,
//     };
//     dispatch({ type: "UPDATE_PROFILE", payload: updatedFields });
//     await AsyncStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
//     console.log("Profile updated in AsyncStorage:", updatedUser);
//   };

//   return (
//     <ProfileContext.Provider
//       value={{
//         users: state.users,
//         loggedInUser: state.loggedInUser,
//         registerUser,
//         dispatch,
//         loginUser,
//         logoutUser,
//         updateProfile,
//       }}
//     >
//       {children}
//     </ProfileContext.Provider>
//   );
// };
