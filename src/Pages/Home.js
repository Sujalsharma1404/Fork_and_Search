import React from "react";
import HeaderHome from "../Components/HeaderHome";
import HomeCarousel from "../Components/HomeCarousel";
import PopularCategories from "../Components/CategorySection";
import NewsletterSignup from "../Components/NewsletterSignup";
import CookingHacks from "../Components/CookingHacks";
import LatestRecipes from "../Components/LatestRecipes";

function Home() {
  return (
    <>
      <HeaderHome />
      <HomeCarousel />
      <PopularCategories/>
      <LatestRecipes />
      <CookingHacks />
      <NewsletterSignup />
    </>
  );
}

export default Home;