import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./config/firebase";

export const UserContext = createContext<User | null>(null);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      fbUser?.emailVerified ? setUser(fbUser) : signOut(auth);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <UserContext.Provider value={user}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
