import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Firestore 불러오기

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="border p-4 rounded-md mb-2">
              <h2 className="text-xl font-semibold">
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600">{post.content.slice(0, 50)}...</p>
            </li>
          ))
        ) : (
          <p>저장된 글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
