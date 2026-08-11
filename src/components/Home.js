import React, { useRef, useEffect } from 'react';
import BannerSlider from './BannerSlider';
import CategorySection from './CategorySection';
import AchievementsSection from './AchievementsSection';
import VideoSection from './VideoSection';
import BannerScrollerSection from './BannerScrollerSection';
import AppShowcaseSection from './AppShowcaseSection';
import ContactSection from './ContactSection';
import StudentShorts from './StudentShorts';
import Header from './Header';
import FooterBannerSlider from './FooterBannerSlider';


const Home = () => {
  const bannerScrollerRef = useRef(null);
  const categorySectionRef = useRef(null);

  // Expose scroll handler globally for Header to call
  useEffect(() => {
    window.scrollToBannerScrollerSection = () => {
      if (bannerScrollerRef.current) {
        bannerScrollerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.scrollToCategorySection = () => {
      if (categorySectionRef.current) {
        categorySectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    return () => {
      delete window.scrollToBannerScrollerSection;
      delete window.scrollToCategorySection;
    };
  }, []);

  return (
    <>
      {/* Banner Slider */}
      <BannerSlider />

      {/* Category Section */}
      <div ref={categorySectionRef}>
        <CategorySection />
      </div>

      {/* Achievements Section */}
      <AchievementsSection />

      {/* Student Shorts Section */}
      <StudentShorts />

      <FooterBannerSlider />
      {/* Video Section */}
      <VideoSection />
      


      {/* App Showcase Section */}
      <AppShowcaseSection />
      {/* Banner Scroller Section */}
      <div ref={bannerScrollerRef}>
        <BannerScrollerSection />
      </div>

      {/* Contact Section */}
      {/* <ContactSection /> */}
    </>
  );
};

export default Home;
