import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 40px 60px;
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.h1`
  font-size: 64px;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

const Menu = styled.ul`
  display: flex;
  gap: 25px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 16px;
`;

const Icons = styled.div`
  display: flex;
  gap: 18px;
  font-size: 18px;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: red;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: inherit;
  }
`;

const TopBar = () => {
  const loginUser = useUserStore((state) => state.loginUser);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <Header>
      <StyledLink to="/">
        <Logo>AIMYON</Logo>
      </StyledLink>
      <Section>
        <Menu>
          <li>
            <StyledLink to="/Board">Board</StyledLink>
          </li>
          <li>Shop</li>
          {!loginUser ? (
            <>
              <li>
                <StyledLink to="/login">Login</StyledLink>
              </li>
              <li>
                <StyledLink to="/register">Signup</StyledLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <StyledLink to="/mypage">MyPage</StyledLink>
              </li>
              <li>
                <StyledLink as="span" onClick={handleLogout}>
                  Logout
                </StyledLink>
              </li>
            </>
          )}
        </Menu>
        <Icons>
          <a href="https://x.com/aimyonGtter" target="_blank">
            <FaXTwitter />
          </a>
          <a href="https://www.facebook.com/aimyong" target="_blank">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/aimyon36" target="_blank">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/channel/UCQVhrypJhw1HxuRV4gX6hoQ" target="_blank">
            <FaYoutube />
          </a>
        </Icons>
      </Section>
    </Header>
  );
};

export default TopBar;
