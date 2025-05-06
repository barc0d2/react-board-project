import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const schema = yup.object().shape({
  userId: yup.string().required('아이디는 필수입니다'),
  userPwd: yup.string().min(6, '비밀번호는 6자 이상 입력해주세요').required('비밀번호는 필수입니다'), //.min을 사용해 최소 숫자자
  confirmPwd: yup
    .string()
    .oneOf([yup.ref('userPwd'), null], '비밀번호가 일치하지 않습니다') //.oneof를 사용해 일치값값
    .required('비밀번호 확인은 필수입니다'),
  name: yup.string().required('이름은 필수입니다'),
  age: yup.number().typeError('숫자만 입력해주세요').required('나이는 필수입니다'), //number().typeError를 통해 숫자가 아니면 에러 메시지 출력력
  gender: yup.string().required('성별을 선택해주세요'),
});

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 140px;
`;

const FormWrapper = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 30px;
  background-color: #fff;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 35px;
  border-radius: 5px;
  border: 1px solid #aaa;
  padding: 0 10px;
`;

const Select = styled.select`
  height: 35px;
  border-radius: 5px;
  border: 1px solid #aaa;
  padding: 0 10px;
`;

const LogoImage = styled.img`
  width: 200px;
  margin: 0 auto 20px;
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

  &:hover {
    background-color: #333;
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: red;
  height: 16px;
  margin-top: 4px;
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const signUp = useUserStore((state) => state.signUp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    signUp(data);
    alert(`${data.name}님 회원가입이 완료되었습니다!`);
    navigate('/login');
  };

  const logoUrl = 'https://www.aimyong.net/static/aimyong/fanclub/cmn/logo_fc.png';

  return (
    <PageWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <LogoImage src={logoUrl} alt="logo" />

        <FormGroup>
          <Label>아이디</Label>
          <Input placeholder="아이디를 입력해주세요" {...register('userId')} />
          <ErrorText>{errors.userId?.message}</ErrorText>
        </FormGroup>

        <FormGroup>
          <Label>비밀번호</Label>
          <Input type="password" placeholder="비밀번호를 입력해주세요" {...register('userPwd')} />
          <ErrorText>{errors.userPwd?.message}</ErrorText>
        </FormGroup>

        <FormGroup>
          <Label>비밀번호 확인</Label>
          <Input type="password" placeholder="비밀번호를 다시 입력해주세요" {...register('confirmPwd')} />
          <ErrorText>{errors.confirmPwd?.message}</ErrorText>
        </FormGroup>

        <FormGroup>
          <Label>이름</Label>
          <Input placeholder="이름을 입력해주세요" {...register('name')} />
          <ErrorText>{errors.name?.message}</ErrorText>
        </FormGroup>

        <FormGroup>
          <Label>나이</Label>
          <Input type="number" placeholder="나이를 입력해주세요" {...register('age')} />
          <ErrorText>{errors.age?.message}</ErrorText>
        </FormGroup>

        <FormGroup>
          <Label>성별</Label>
          <Select {...register('gender')}>
            <option value="">선택</option>
            <option value="male">남</option>
            <option value="female">여</option>
          </Select>
          <ErrorText>{errors.gender?.message}</ErrorText>
        </FormGroup>

        <Button type="submit">회원가입</Button>
      </FormWrapper>
    </PageWrapper>
  );
};

export default SignUpPage;
