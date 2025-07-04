import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import Blog from "./components/Blog";
import { Post } from "./classes/Post";
import { collection, onSnapshot } from "firebase/firestore";
import PostPage from "./components/PostPage";
import { ITag, calculateTags } from "./classes/Tags";

export const UserContext = createContext<User | null>(null);

interface IBlogContext {
  posts: Post[];
  tags: ITag[];
}

export const BlogContext = createContext<IBlogContext>({ posts: [], tags: [] });

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      fbUser?.emailVerified ? setUser(fbUser) : signOut(auth);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts((currentPostList) => {
        let currentPosts = [...currentPostList];
        let allSlugs = currentPosts.map((x) => x.slug);

        snapshot.docChanges().map((change) => {
          const postData = change.doc.data() as Post;

          if (change.type === "added") {
            if (allSlugs.includes(postData.slug)) return;
            currentPosts = [...currentPosts, new Post(postData)];
          } else if (change.type === "modified") {
            currentPosts = currentPosts.map((x) => (x.slug === postData.slug ? postData : x));
          } else {
            currentPosts = currentPosts.filter((x) => x.slug !== postData.slug);
          }
        });

        setTags((currentTags) => calculateTags(currentPosts, currentTags));
        return currentPosts;
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <BlogContext.Provider value={{ posts, tags }}>
          <Header />
          <main className="m4b-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/post/:slug" element={<PostPage />} />
            </Routes>
          </main>
        </BlogContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
