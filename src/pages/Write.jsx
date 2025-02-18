import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Write = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [isEdit, setIsEdit] = useState(false); // 수정 여부 확인

  // 기존 게시글 불러오기
  useEffect(() => {
    if (id) {
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const postToEdit = savedPosts[id];

      if (postToEdit) {
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
        setIsEdit(true);
      }
    }
  }, [id]);

  // 글 저장하기 / 수정하기
  const savePost = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요!");
      return;
    }

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

    if (isEdit) {
      savedPosts[id] = { title, content, date: new Date().toISOString() };
    } else {
      const newPost = { title, content, date: new Date().toISOString() };
      savedPosts.push(newPost);
    }

    localStorage.setItem("posts", JSON.stringify(savedPosts));
    alert(isEdit ? "게시글이 수정되었습니다!" : "게시글이 저장되었습니다!");

    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {isEdit ? "게시글 수정" : "글 작성"}
      </h1>

      {/* 제목 입력 */}
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        placeholder="제목을 입력하세요..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 내용 입력 */}
      <textarea
        className="w-full h-40 p-2 border rounded-md"
        placeholder="Markdown 형식으로 글을 작성하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 저장 버튼 */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={savePost}
      >
        {isEdit ? "수정완료" : "저장하기"}
      </button>

      {/* 미리보기 */}
      <h2 className="text-2xl font-bold mt-6">미리보기</h2>
      <div className="p-4 border rounded-md bg-gray-100">
        <h2 className="text-xl font-semibold">{title}</h2>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Write;
