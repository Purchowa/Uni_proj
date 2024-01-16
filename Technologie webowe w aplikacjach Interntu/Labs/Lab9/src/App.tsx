import './App.css';
import Home from "./components/home";
import Posts from "./components/posts";
import AddPost from "./components/addPost";
import NotFound from "./components/notFound";
import Charts from './components/charts';

import { BrowserRouter as Router, Routes, Route, Link }
  from 'react-router-dom';
import Chat from './components/chat';

function App() {

  return (
    <Router>
      <nav style={{ margin: 12 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/posts" style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to="/add_post" style={{ padding: 5 }}>
          Add posts
        </Link>
        <Link to="/charts" style={{ padding: 5 }}>
          Charts
        </Link>
        <Link to="/chat" style={{ padding: 5 }}>
          Chat
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/add_post" element={<AddPost />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ Router>
  )
}

export default App
