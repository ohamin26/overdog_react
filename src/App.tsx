import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Content } from './routes/content';
import { Comment } from './components/comment';
import { Notice } from './routes/notice';
import { NoticeDetail } from './routes/notice_detail';
import { RecoilRoot } from 'recoil';
import { Profile } from './routes/profile';
import { ProfileContent } from './routes/profile_content';
function App() {
  return (
    <RecoilRoot>
      <div className="font-pretendard">
        <Router basename={import.meta.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Content />}></Route>
            <Route path="/comment" element={<Comment />}></Route>
            <Route path="/notice" element={<Notice />}></Route>
            <Route path="/notice_detail" element={<NoticeDetail />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/ProfileContent" element={<ProfileContent />}></Route>
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}
export default App;
