import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const Post = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0); // Firestore에서 가져올 좋아요 수
  const [liked, setLiked] = useState(false); // 사용자가 좋아요를 눌렀는지 여부

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();
        setPost(postData);
        setLikes(postData.likes || 0);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // 좋아요 버튼 클릭시 Firestore 업데이트
  const toggleLike = async () => {
    if (!post) return;

    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentLikes = docSnap.data().likes || 0;
      const newLikes = liked ? currentLikes - 1 : currentLikes + 1;

      await updateDoc(docRef, { like: newLikes });
      setLiked(!liked);
      setLikes(newLikes);
    }
  };

  //   게시글 삭제 함수
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);

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
        onClick={toggleLike}
        className={`px-4 py-2 rounded-md mt-4 ${
          liked ? "bg-red-500 text-white" : "bg-gray-300"
        }`}
      >
        ❤️ {likes} 좋아요
      </button>
      <button
        onClick={() => navigate(`/write/${id}`)}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 ml-2"
      >
        ✏️ 수정하기
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-2"
      >
        🗑 삭제하기
      </button>

      <Link to="/" className="block text-blue-500 mt-4">
        ← 홈으로 돌아가기
      </Link>
    </div>
  );
};

export default Post;
