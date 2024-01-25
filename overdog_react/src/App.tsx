import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { Content } from './routes/content';
import { Comment } from './routes/comment';
import { Notice } from './components/notice';
function App() {
  return (
    <div className="font-pretendard">
      <Router basename={import.meta.env.PUBLIC_URL}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Content />}></Route>
          <Route path="/comment" element={<Comment />}></Route>
          <Route path="/notice" element={<Notice />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
