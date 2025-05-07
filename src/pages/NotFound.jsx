import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 45vh;
  text-align: center;
  background-color: white;
  padding: 2rem;
  margin: 200px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

const LogoImage = styled.img`
  font-size: 4rem;
  background-color: 2c3e50;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #3e3e3e;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    background-color: #333;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const logoUrl =
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdEJxMV%2FbtsNKgBGmJB%2FApD14WgaFJPb48C4qd8Tek%2Fimg.png';

  return (
    <Container>
      <LogoImage src={logoUrl} alt="logo" />
      <Message>페이지를 찾을 수 없습니다</Message>
      <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
    </Container>
  );
};

export default NotFound;
