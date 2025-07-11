import React from "react";
import HeaderHome from "../Components/HeaderHome";
import HomeCarousel from "../Components/HomeCarousel";
import CategorySection from "../Components/CategorySection";
import NewsletterSignup from "../Components/NewsletterSignup";
import CookingHacks from "../Components/CookingHacks";
import LatestRecipes from "../Components/LatestRecipes"
function Home() {
  return (
    <>
      <HeaderHome />
      {/* Later: HeroSection, FeaturedRecipes, etc. */}
      <HomeCarousel/>
      <CategorySection/>
      <LatestRecipes />
      <CookingHacks />
      <NewsletterSignup />
    </>
  );
}

export default Home;
