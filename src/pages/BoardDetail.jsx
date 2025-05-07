import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 140px;
`;

const Wrapper = styled.div`
  width: 960px;
  padding: 60px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
  border-top: 1px solid #eeeeee;
  padding-top: 20px;
  margin-bottom: 40px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: #333333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BoardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <Wrapper>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
        <NavLinks>
          <StyledLink to={`/board/${id}/edit`}>수정</StyledLink>
          <span>|</span>
          <StyledLink to="/board">목록으로</StyledLink>
        </NavLinks>
      </Wrapper>
    </Container>
  );
};

export default BoardDetail;
