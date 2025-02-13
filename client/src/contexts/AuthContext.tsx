import { createContext, useContext, useEffect, useState } from "react";
import { 
  Auth,
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
import { auth } from "../firebase/config";

interface AuthContextType {
  currentUser: User | null;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
  createPassword: (password: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function googleSignIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function logout() {
    await signOut(auth);
  }

  async function createPassword(password: string) {
    if (!currentUser?.email) throw new Error("No user email found");
    await createUserWithEmailAndPassword(auth, currentUser.email, password);
  }

  async function signInWithPassword(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleSignIn,
    logout,
    createPassword,
    signInWithPassword,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
