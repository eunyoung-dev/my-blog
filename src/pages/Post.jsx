import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPost(savedPosts[id]); // id에 해당하는 게시글 가져오기
  }, [id]);

  if (!post) {
    return (
      <div className="text-center text-xl">게시글을 찾을 수 없습니다. 😢</div>
    );
  }

  //   게시글 삭제 함수
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.splice(id, 1);
    localStorage.setItem("posts", JSON.stringify(savedPosts));
    alert("게시글이 삭제되었습니다.");
    navigate("/"); // 삭제 후 홈으로 이동
  };

  if (!post) {
    return (
      <div className="text-center text-xl">게시글을 찾을 수 없습니다. 😢</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(post.date).toLocaleString()}
      </p>
      <div className="p-4 border rounded-md bg-gray-100">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
      >
        삭제하기
      </button>
      <button
        onClick={() => navigate(`/write/${id}`)}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
      >
        수정하기
      </button>
      <Link to="/" className="block text-blue-500 mt-4">
        ← 홈으로 돌아가기
      </Link>
    </div>
  );
};

export default Post;
