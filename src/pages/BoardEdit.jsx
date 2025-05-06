import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
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
  background-color: #fff;
  border: 1px solid #ccc;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid #ccc;
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
    background-color: #333;
  }
`;

const BoardEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const loginUser = useUserStore((state) => state.loginUser);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    await axios.put(`http://localhost:3001/posts/${id}`, {
      title,
      content,
      author: loginUser.userId,
      date: new Date().toISOString().slice(0, 10), //slice(0,10) 앞 10자리 날짜
    });
    navigate(`/board/${id}`);
  };

  return (
    <Container>
      <Form onSubmit={handleUpdate}>
        <Title>게시글 수정</Title>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextArea value={content} onChange={(e) => setContent(e.target.value)} />
        <Button type="submit">수정</Button>
      </Form>
    </Container>
  );
};

export default BoardEdit;
