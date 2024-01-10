import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext"; // Importing the UserContext
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../backend/Firebase"; // Importing Firebase authentication

// This component manages the user authentication state and provides it through the UserContext
export const UserState = (props) => {
  const [UserAuth, setUserAuth] = useState(false); // State to hold the user authentication status

  useEffect(() => {
    // This useEffect listens to the authentication state changes using onAuthStateChanged from Firebase
    const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // When the authentication state changes, it updates the UserAuth state
      setUserAuth(currentUser); // currentUser will be the authenticated user object or null
    });

    // Cleanup function to unsubscribe when the component unmounts or re-renders
    return () => {
      Unsubscribe(); // Unsubscribe from the authentication state changes
    };
  }, []);

  const setUser = (values) => {
    setUserAuth(values);
  };

  return (
    <UserContext.Provider value={{ UserAuth, setUser }}>
      {/* Providing the UserAuth value through the UserContext */}
      {/* This allows consuming components to access the authentication state */}
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the UserContext and access the authentication state
export const UseAuthContext = () => {
  return useContext(UserContext); // Returns the value from UserContext (which contains UserAuth)
};
