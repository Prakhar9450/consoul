"use client"
import { ContactForm } from "../components/ContactForm";
import { WhyChooseUsList } from "../components/WhyChooseUsList";

export const ChooseUs = () => {
  return (
    <div className="bg-white md:bg-[#F1EAFF] h-full py-4">
      <div className="hidden md:grid grid-cols-2 w-full max-h-[100vh]">
        <div className="col-span-1 flex justify-center pl-40 mt-64 ">
          <div className="font-extrabold text-4xl text-[#555555]">
            Why choose us?
          </div>
        </div>

        <div className=" w-full mt-32 pr-72 " >
        <WhyChooseUsList  />

        </div>
      </div>

      <div className="md:my-20 flex justify-center md:mx-24" id="contact" >
        <ContactForm />
      </div>
    </div>
  );
};
