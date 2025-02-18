import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore 불러오기

const Write = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // 기존 게시글 불러오기 (수정 모드일 경우)
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const post = docSnap.data();
          setTitle(post.title);
          setContent(post.content);
          setIsEdit(true);
        }
      };
      fetchPost();
    }
  }, [id]);

  // 게시글 저장 (새 글 작성 & 수정)
  const savePost = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요!");
      return;
    }

    if (isEdit) {
      // 수정 모드
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        title,
        content,
        date: new Date().toISOString(),
      });
      alert("게시글이 수정되었습니다!");
    } else {
      // 새 글 작성
      await addDoc(collection(db, "posts"), {
        title,
        content,
        date: new Date().toISOString(),
      });
      alert("게시글이 저장되었습니다!");
    }

    navigate("/"); // 저장 후 홈으로 이동
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {isEdit ? "게시글 수정" : "새 글 작성"}
      </h1>

      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        placeholder="제목을 입력하세요..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full h-40 p-2 border rounded-md"
        placeholder="Markdown 형식으로 글을 작성하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={savePost}
      >
        {isEdit ? "수정 완료" : "저장하기"}
      </button>
    </div>
  );
};

export default Write;
