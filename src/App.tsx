import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./config/firebase";
import Blog from "./components/Blog";
import { Post } from "./classes/Post";
import { samplePostList } from "./classes/samplePosts";

export const UserContext = createContext<User | null>(null);
export const PostsContext = createContext<Post[]>([]);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [postList, _setPostList] = useState<Post[]>(samplePostList);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      fbUser?.emailVerified ? setUser(fbUser) : signOut(auth);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <PostsContext.Provider value={postList}>
          <Header />
          <main style={{ width: "min(1000px, 90%)", margin: "0 auto" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
        </PostsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
