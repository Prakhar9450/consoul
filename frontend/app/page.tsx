"use client"
import { Hero } from "./pages/Hero";
import { Services } from "./pages/Services";
import { ChooseUs } from "./pages/ChooseUs";
import { SuccessStories } from "./pages/SuccessStories";
import Footer from "./components/Footer";
import { SuccessStoriesComp } from "./components/SuccessStoriesComp";
import { SuccessStoriesMobileComp } from "./components/SuccessStoriesMobileComp";


export default function Home() {


  return (
    <div>
      <Hero />
      <Services />
      <ChooseUs />
      
     <div className="hidden md:block"><SuccessStoriesComp /> <SuccessStories /></div>
     <div className="block md:hidden my-10"><SuccessStoriesMobileComp ></SuccessStoriesMobileComp></div>
      <Footer />
    
    </div>
  );
}
