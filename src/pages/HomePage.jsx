import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

const SlideWrapper = styled.div`
  position: relative;
  width: 1080px;
  height: 700px;
  overflow: hidden;
  margin: 32px auto;
  padding-top: 120px;
`;

const SlideTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $currentIndex }) => `translateX(-${1080 * $currentIndex}px)`};
  //슬라이드에서 좌우로 화면을 이동시킴. 왼쪽으로 1080만큼큼
`;

const SlideItem = styled.div`
  width: 1080px;
  height: 700px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eeeeee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: none;
  }
`;

const PrevButton = styled(NavButton)`
  left: 10px;
`;

const NextButton = styled(NavButton)`
  right: 10px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const Content = styled.main`
  flex: 1;
  margin-top: 40px;
`;

const Section = styled.section`
  max-width: 1080px;
  margin: 80px auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 60px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px 40px;
  justify-items: center;
`;

const ContentItem = styled.div`
  text-align: center;
`;

const ContentImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
`;

const ContentTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ContentDesc = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
`;

const HomePage = () => {
  const mainImg = [
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnT1Ur%2FbtsNKrWtSZF%2FKejwG76548YbGvRPueLfik%2Fimg.webp',
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fzh28r%2FbtsNJ0dZ0Wv%2Fy36rwHQlbJNmgVtGZIPHe0%2Fimg.webp',
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fd2IfG9%2FbtsNKztmlww%2FKzOl2ZCfrK7WVZnsJGX68k%2Fimg.webp',
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOzfiP%2FbtsNKs8STva%2FlsG9HSMsLIKykJ4Uo5d2KK%2Fimg.webp',
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPOVzE%2FbtsNKtGKk3E%2Fs90KumqyLjmCCpOj3Nt4Q1%2Fimg.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = mainImg.length;
  const intervalRef = useRef(null);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides); // 이미지를 하나씩 넘김 다 넘어가면 초기화
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    intervalRef.current = setInterval(goToNext, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const pauseAutoSlide = () => clearInterval(intervalRef.current); //자동 슬라이드 중지
  const resumeAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goToNext, 3000); // 3초마다 ㅅ슬라이드
  };

  return (
    <PageWrapper>
      <Content>
        <SlideWrapper onMouseEnter={pauseAutoSlide} onMouseLeave={resumeAutoSlide}>
          <PrevButton onClick={goToPrev}>◀</PrevButton>
          <NextButton onClick={goToNext}>▶</NextButton>

          <SlideTrack $currentIndex={currentIndex}>
            {mainImg.map((url, index) => (
              <SlideItem key={index}>
                <img src={url} alt={`Slide ${index + 1}`} />
              </SlideItem>
            ))}
          </SlideTrack>
        </SlideWrapper>
      </Content>

      <Section>
        <SectionTitle>MEMBER CONTENTS</SectionTitle>
        <Grid>
          <ContentItem>
            <ContentImage
              src="https://www.aimyong.net/static/aimyong/fanclub/top/202405/ico_diary-min.png"
              alt="Diary"
            />
            <ContentTitle>DIARY</ContentTitle>
            <ContentDesc>AIMYON 매일을 철저하는 블로그입니다.</ContentDesc>
          </ContentItem>

          <ContentItem>
            <ContentImage
              src="https://www.aimyong.net/static/aimyong/fanclub/top/202405/ico_mypage-min.png"
              alt="Staff Blog"
            />
            <ContentTitle>STAFF BLOG</ContentTitle>
            <ContentDesc>AIMYON의 무대 뒤를 사진으로 전달하는 스탭 블로그입니다.</ContentDesc>
          </ContentItem>

          <ContentItem>
            <ContentImage
              src="https://www.aimyong.net/static/aimyong/fanclub/top/202405/ico_movie-min.png"
              alt="Movie"
            />
            <ContentTitle>MOVIE</ContentTitle>
            <ContentDesc>AIM만으로 볼 수 있는 오리지널 동영상을 수시로 전달합니다.</ContentDesc>
          </ContentItem>

          <ContentItem>
            <ContentImage
              src="https://www.aimyong.net/static/aimyong/fanclub/top/202405/ico_radio-min.png"
              alt="Radio"
            />
            <ContentTitle>RADIO</ContentTitle>
            <ContentDesc>여기에서만 무료 토크를 제공하는 포인트 라디오 콘텐츠입니다.</ContentDesc>
          </ContentItem>
        </Grid>
      </Section>

      <Footer />
    </PageWrapper>
  );
};

export default HomePage;
