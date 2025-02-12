// import React, { useContext, useState, useEffect, ReactNode } from "react";
// import { auth } from "../firebase/firebase";
// import { onAuthStateChanged, User } from "firebase/auth";
// // import {  GoogleAuthProvider } from "firebase/auth";

// interface AuthContextType {
//   userLoggedIn: boolean;
//   isEmailUser: boolean;
//   isGoogleUser: boolean;
//   currentUser: User | null;
//   setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
//   const [isEmailUser, setIsEmailUser] = useState<boolean>(false);
//   const [isGoogleUser] = useState<boolean>(false);
//   // const [setIsGoogleUser] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, initializeUser);
//     return () => unsubscribe();
//   }, []);

//   async function initializeUser(user: User | null) {
//     if (user) {
//       setCurrentUser(user);
//       setIsEmailUser(user.providerData.some((provider) => provider.providerId === "password"));
      
//       // check if the auth provider is google or not
//       // const isGoogle = user.providerData.some(
//       //   (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
//       // );
//       // setIsGoogleUser(isGoogle);
      
//       setUserLoggedIn(true);
//     } else {
//       setCurrentUser(null);
//       setUserLoggedIn(false);
//     }
//     setLoading(false);
//   }

//   const value: AuthContextType = {
//     userLoggedIn,
//     isEmailUser,
//     isGoogleUser,
//     currentUser,
//     setCurrentUser,
//   };

//   return (
//     <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
//   );

import React, { useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, User, GoogleAuthProvider } from "firebase/auth";

interface AuthContextType {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  currentUser: User | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isEmailUser, setIsEmailUser] = useState<boolean>(false);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsEmailUser(user.providerData.some((provider) => provider.providerId === "password"));
        setIsGoogleUser(user.providerData.some((provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID));
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setIsEmailUser(false);
        setIsGoogleUser(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

// }
