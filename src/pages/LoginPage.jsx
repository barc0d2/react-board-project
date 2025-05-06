import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserStore } from '../store/useUserStore';

const schema = yup.object({
  userId: yup.string().required('아이디를 입력해주세요'),
  userPwd: yup.string().required('비밀번호를 입력해주세요'),
});

const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  background-color: #fff;
`;

const FormWrapper = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 30px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  align-self: flex-start;
`;

const Input = styled.input`
  height: 35px;
  border-radius: 5px;
  border: 1px solid #aaa;
  padding: 0 10px;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  align-self: flex-start;
`;

const LogoImage = styled.img`
  width: 200px;
  margin-bottom: 20px;
  align-self: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #3e3e3e;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #333;
  }
`;

const LoginPage = () => {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await login(data.userId, data.userPwd);

    if (useUserStore.getState().loginUser) {
      alert(`${data.userId}님, 로그인 성공!`);
      navigate('/');
    } else {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  const logoUrl = 'https://www.aimyong.net/static/aimyong/fanclub/cmn/logo_fc.png';

  return (
    <PageWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <LogoImage src={logoUrl} alt="logo" />
        <FormGroup>
          <Label>아이디</Label>
          <Input {...register('userId')} placeholder="아이디를 입력해주세요" />
          <ErrorText>{errors.userId?.message}</ErrorText>
        </FormGroup>

        <FormGroup>
          <Label>비밀번호</Label>
          <Input type="password" {...register('userPwd')} placeholder="비밀번호를 입력해주세요" />
          <ErrorText>{errors.userPwd?.message}</ErrorText>
        </FormGroup>

        <Button type="submit">로그인</Button>
      </FormWrapper>
    </PageWrapper>
  );
};

export default LoginPage;
