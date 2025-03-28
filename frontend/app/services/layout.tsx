import { DownloadGuide } from "../components/Download-guide";
import Footer from "../components/Footer";
import { ServicesNav } from "../components/ServicesNav";
import { SuccessStoriesComp } from "../components/SuccessStoriesComp";
import { SuccessStoriesMobileComp } from "../components/SuccessStoriesMobileComp";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div suppressHydrationWarning>
        <ServicesNav />
        {children}
        <div className="text-center my-10 hidden md:block" >
        <a href="https://cal.com/consoul-solutions"><button className="bg-[#6438C3] text-white px-6 py-3 rounded-lg text-lg font-medium">
            Book a Free Consultation
          </button></a>
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
  