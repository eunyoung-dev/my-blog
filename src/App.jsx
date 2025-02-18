import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Write from "./pages/Write";
// import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/write/:id" element={<Write />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
