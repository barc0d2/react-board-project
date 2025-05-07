import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useUserStore } from '../store/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 140px;
`;

const Form = styled.form`
  width: 960px;
  padding: 60px;
  margin-top: 20px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid #cccccc;
  background-color: white;
  color: black;
  border-radius: 4px;
  font-size: 18px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid #cccccc;
  background-color: white;
  color: black;
  border-radius: 4px;
  font-size: 18px;
  resize: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: black;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #333333;
  }
`;

const BoardCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const loginUser = useUserStore((state) => state.loginUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      return;
    }
    const newPost = {
      title,
      content,
      author: loginUser.userId,
      date: new Date().toISOString().slice(0, 10),
    };
    await axios.post('http://localhost:3001/posts', newPost);
    navigate('/board');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>게시글 작성</Title>
        <Input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextArea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button type="submit">작성</Button>
      </Form>
    </Container>
  );
};

export default BoardCreate;
