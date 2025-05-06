import { Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFound from './pages/NotFound';
import BoardList from './pages/BoardList';
import BoardCreate from './pages/BoardCreate';
import BoardDetail from './pages/BoardDetail';
import BoardEdit from './pages/BoardEdit';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MyPage from './pages/MyPage';

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const location = useLocation();
  const hideTopBar = ['/login', '/register', '/mypage'];

  const isTopBarHidden = hideTopBar.includes(location.pathname);

  return (
    <>
      {!isTopBarHidden && <TopBar />}
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/board/create" element={<BoardCreate />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/board/:id/edit" element={<BoardEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>
    </>
  );
}

export default App;
