import React from "react";
import HeaderHome from "../Components/HeaderHome";
import HomeCarousel from "../Components/HomeCarousel";
import PopularCategories from "../Components/CategorySection";
import NewsletterSignup from "../Components/NewsletterSignup";
import CookingHacks from "../Components/CookingHacks";
import LatestRecipes from "../Components/LatestRecipes";
import CategoryData from '../Components/Data/CategoryData.json';

function Home() {
  return (
    <>
      <HeaderHome />
      <HomeCarousel />
      <PopularCategories categories={CategoryData} />
      <LatestRecipes />
      <CookingHacks />
      <NewsletterSignup />
    </>
  );
}

export default Home;