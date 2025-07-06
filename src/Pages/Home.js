import React from "react";
import HeaderHome from "../Components/HeaderHome";
import HomeCarousel from "../Components/HomeCarousel";

function Home() {
  return (
    <>
      <HeaderHome />
      {/* Later: HeroSection, FeaturedRecipes, etc. */}
      <HomeCarousel/>
    </>
  );
}

export default Home;
