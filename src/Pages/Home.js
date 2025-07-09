import React from "react";
import HeaderHome from "../Components/HeaderHome";
import HomeCarousel from "../Components/HomeCarousel";
import CategorySection from "../Components/CategorySection";
import NewsletterSignup from "../Components/NewsletterSignup";
function Home() {
  return (
    <>
      <HeaderHome />
      {/* Later: HeroSection, FeaturedRecipes, etc. */}
      <HomeCarousel/>
      <CategorySection/>
      <NewsletterSignup />
    </>
  );
}

export default Home;
