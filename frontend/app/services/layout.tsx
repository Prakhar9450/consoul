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
          <button className="bg-[#6438C3] text-white px-6 py-3 rounded-lg text-lg font-medium">
            Book a Free Consultation
          </button>
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
        <div className="text-center w-full block md:hidden" >
          <button className="bg-gradient-to-b from-[#6438C3] to-[#4B21A6] w-full text-white px-6 py-3 text-lg font-medium">
            Book a Free Consultation
          </button>
        </div>
      </div>
    );
  }
  