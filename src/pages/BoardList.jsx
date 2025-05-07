import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useUserStore } from '../store/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 140px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  width: 960px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 20px;
  margin: 60px;
  padding: 60px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  width: 100vh;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 60px;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  padding: 20px 0;
  border-bottom: 1px solid #dddddd;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fafafa;
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
`;

const PostTitle = styled(Link)`
  font-size: 16px;
  color: #111111;
  text-decoration: none;
  display: block;
  line-height: 1.6;

  &:hover {
    text-decoration: underline;
  }
`;

const WriteButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 20px;
  background-color: black;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
`;

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const loginUser = useUserStore((state) => state.loginUser);

  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((res) => setPosts(res.data));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/posts/${id}`);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <Container>
      <Wrapper>
        <Title>Board</Title>
        {loginUser && <WriteButton to="/board/create">글 작성</WriteButton>}
        <PostList>
          {Array.isArray(posts) &&
            posts.map((post) => (
              <PostItem key={post.id}>
                <PostMeta>
                  <div>{post.author || '익명'}</div>
                  <div>{post.date || ''}</div>
                </PostMeta>
                <PostTitle to={`/board/${post.id}`}>{post.title}</PostTitle>
                {loginUser?.userId === post.author && <button onClick={() => handleDelete(post.id)}>삭제</button>}
              </PostItem>
            ))}
        </PostList>
      </Wrapper>
    </Container>
  );
};

export default BoardList;
