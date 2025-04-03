import { DownloadGuide } from "../components/Download-guide";
import Footer from "../components/Footer";
import { ServicesNav } from "../components/ServicesNav";
import { SuccessStoriesComp } from "../components/SuccessStoriesComp";
import { SuccessStoriesMobileComp } from "../components/SuccessStoriesMobileComp";
import AnimatedSwipeButton from "../components/ui/AnimatedSwipeButton";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div suppressHydrationWarning>
        <ServicesNav />
        {children}
        <div className="text-center my-10 hidden md:flex justify-center" >
          <a href=" https://cal.com/consoul-solutions"><AnimatedSwipeButton
                              className="hidden md:block rounded-lg "
                              firstClass=" bg-gradient-to-b from-[#6438C3] to-[#4B21A6] text-white text-lg p-3 px-6"
                              firstText="Book a free Consultation"
                              secondClass="bg-[#A47EF6] text-white text-lg p-3 px-6 "
                              secondText="Book a free Consultation"
                            /></a>
        </div>
        <div className="my-10  md:my-20 flex justify-center">
          <DownloadGuide />
        </div>
        <div className="my-10 hidden md:block">
          <SuccessStoriesComp />
        </div>
        <div className="my-8 block md:hidden">
          <SuccessStoriesMobileComp />
        </div>
        <div className="">
          <Footer />
        </div>
       
      </div>
    );
  }
  