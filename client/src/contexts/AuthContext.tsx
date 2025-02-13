import { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword
} from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  createPassword: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function signInWithPassword(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUpWithPassword(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  async function createPassword(password: string) {
    if (!currentUser) throw new Error("No user found");
    await updatePassword(currentUser, password);
  }

  async function logout() {
    await signOut(auth);
  }

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

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    signInWithGoogle,
    signInWithPassword,
    signUpWithPassword,
    resetPassword,
    createPassword,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}