"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";

export default function PrivacyPolicy() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="text-[#555555] container mx-auto mt-8 md:mt-20 px-5 md:px-12 py-8 max-w-4xl">
          <button
            onClick={goBack}
            className="flex items-center text-[#6438C3] mb-6 hover:underline md:hidden">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to the previous page
          </button>

          <h1 className="text-2xl md:text-5xl font-extrabold mb-2 md:mb-3">
            Privacy Policy
          </h1>
          <p className="mb-8 md:mb-16 text-sm md:text-xl">
            By wakxlxdr / June 22, 2023
          </p>

          <p className="mb-6 md:mb-8 text-lg md:text-2xl">
            Last updated: June 22, 2023
          </p>

          <div className="space-y-6 md:space-y-8">
            <div className="text-sm md:text-2xl">
              <p className="mb-4">
                www.consoulsolution.com ("us", "we", or "our") operates the
                www.consoulsolution.com website (the "Service").
              </p>

              <p>
                This page informs you of our policies regarding the collection,
                use and disclosure of Personal Information when you use our
                Service.
              </p>
              <p className="mb-4">
                We will not use or share your information with anyone except as
                described in this Privacy Policy.
              </p>

              <p className="mb-4 md:mb-14">
                We use your personal information for providing and improving the
                Service. By using the Service, you agree to the collection and
                use of information in accordance with this policy. Unless
                otherwise defined in this Privacy Policy, terms used in this
                Privacy Policy have the same meanings as in our Terms and
                Conditions, accessible at http://consoulsolution.com.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Information collection and use
              </h2>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                While using our Service, we may ask you to provide us with
                certain personally identifiable information that can be used to
                contact or identify you. Personally identifiable information
                ("Personal Information") may include, but is not limited to:
              </p>
              <ul className="md:list-disc md:pl-8 mb-4 md:mb-14 space-y-1 text-sm md:text-2xl">
                <li>Name</li>
                <li>Email address</li>
                <li>Telephone number</li>
                <li>Address</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Marketing emailers
              </h2>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                By providing your email address to us, you consent to receive
                promotional emails, newsletters, and other marketing
                communications from us. You can opt-out of receiving these
                communications at any time by clicking the 'unsubscribe' link
                provided in the emails or by contacting us directly. Please note
                that even if you opt out of receiving marketing emails, we may
                still send you non-promotional communications, such as
                transactional emails or information regarding your account.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Log data
              </h2>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                We collect information that your browser sends whenever you
                visit our Service ("Log Data"). This Log Data may include
                information such as your computer's Internet Protocol ("IP")
                address, browser type, browser version, the pages of our Service
                that you visit, the time and date of your visit, the time spent
                on those pages and other statistics.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Cookies
              </h2>
              <p className="md:mb-4 text-sm md:text-2xl">
                Cookies are files with small amount of data, which may include
                an anonymous unique identifier. Cookies are sent to your browser
                from a web site and stored on your computer's hard drive.
              </p>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                We use "cookies" to collect information. You can instruct your
                browser to refuse all cookies or to indicate when a cookie is
                being sent. However, if you do not accept cookies, you may not
                be able to use some portions of our Service.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Service providers
              </h2>
              <p className="md:mb-4 text-sm md:text-2xl">
                We may employ third party companies and individuals to
                facilitate our Service, to provide the Service on our behalf, to
                perform Service-related services or to assist us in analysing
                how our Service is used.
              </p>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                These third parties have access to your Personal Information
                only to perform these tasks on our behalf and are obligated not
                to disclose or use it for any other purpose.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Security
              </h2>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                The security of your Personal Information is important to us,
                but remember that no method of transmission over the Internet,
                or method of electronic storage is 100% secure. While we strive
                to use commercially acceptable means to protect your Personal
                Information, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Link to other sites
              </h2>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                Our Service may contain links to other sites that are not
                operated by us. If you click on a third party link, you will be
                directed to that third party's site. We strongly advise you to
                review the Privacy Policy of every site you visit. We have no
                control over, and assume no responsibility for the content,
                privacy policies or practices of any third party sites or
                services.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Children's privacy
              </h2>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                Our Service does not address anyone under the age of 18
                ("Children"). We do not knowingly collect personally
                identifiable information from children under 18. If you are a
                parent or guardian and you are aware that your child has
                provided us with Personal Information, please contact us. If we
                discover that a child under 18 has provided us with Personal
                Information, we will delete such information from our servers
                immediately.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Compliance with laws
              </h2>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                We will disclose your Personal Information where required to do
                so by law or subpoena.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Changes to privacy policy in this page
              </h2>
              <p className="md:mb-4 text-sm md:text-2xl">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page.
              </p>
              <p className="mb-4 md:mb-14 text-sm md:text-2xl">
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-4xl font-bold mb-2 md:mb-4">
                Contact us
              </h2>
              <p className="mb-4 text-sm md:text-2xl">
                If you have any questions about this Privacy Policy, please
                contact us.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
