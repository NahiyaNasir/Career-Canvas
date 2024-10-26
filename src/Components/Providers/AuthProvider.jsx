import { createContext, useEffect, useState } from "react";
import {app} from "../Firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeId, setResumeId] = useState('');
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([]); // Add this state

  const createUser = async (email, password) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      return result;
    } catch (error) {
      setError("Error creating user: " + error.message);
    } finally {
      setLoading(false);
    }
  };
 // Function to add a message
 const addChatMessage = (message) => {
  setChatMessages((prevMessages) => [...prevMessages, message]);
};

// Function to clear messages
const clearChatMessages = () => {
  setChatMessages([]);
};

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      return result;
    } catch (error) {
      setError("Error signing in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null); // Reset user state
    localStorage.removeItem('token');
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      return result;
    } catch (error) {
      setError("Error signing in with Google: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  // console.log(user);
  
  const UpdateProfile = (fullName , role) => {
    return updateProfile(auth.currentUser, {
        displayName: fullName, 
        role : role
    })
};

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    createUser,
    signIn,
    logOut,
    signInWithGoogle,
    user,
    loading,
    UpdateProfile,
    resumeId,
    error, // Add error to context value
    clearChatMessages ,
    addChatMessage ,
    chatMessages
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
