import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
width: 100vw;
  padding: 20px 0px;
  background: #f8f8f8;
  text-align: center;
  font-size: 14px;
  color: #777;
  border-top: 1px solid #ddd;
`;

const Footer = () => {
  return (
    <FooterContainer>
      ⓒ 2025 대충 푸터 Official.
    </FooterContainer>
  );
};

export default Footer;
