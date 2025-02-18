import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <li key={index} className="border p-4 rounded-md mb-2">
              <h2 className="text-xl font-semibold">
                <Link
                  to={`/post/${index}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600">{post.content.slice(0, 50)}...</p>
              <p className="text-sm text-gray-400">
                {new Date(post.date).toLocaleString()}
              </p>
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
