import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { Content } from './routes/content';
import { Comment } from './routes/comment';
function App() {
  return (
    <div>
      <Router basename={import.meta.env.PUBLIC_URL}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Content />}></Route>
          <Route path="/comment" element={<Comment />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
