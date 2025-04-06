"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FormData {
  fullName: string;
  email: string;
  companyWebsite: string;
  jobTitle: string;
  phoneNumber: string;
}

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

interface DownloadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  documentTitle?: string;
}

// Internal Download Form Component
const DownloadForm: React.FC<DownloadFormProps> = ({ isOpen, onClose, onSubmit, documentTitle }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    companyWebsite: "",
    jobTitle: "",
    phoneNumber: "",
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState("🇮🇳");

  const countries: Country[] = [
    { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
    { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
    { code: "BG", name: "Bulgaria", dialCode: "+359", flag: "🇧🇬" },
    { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
    { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
    { code: "CY", name: "Cyprus", dialCode: "+357", flag: "🇨🇾" },
    { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
    { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
    { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
    { code: "EE", name: "Estonia", dialCode: "+372", flag: "🇪🇪" },
    { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
    { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
    { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
    { code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
    { code: "HR", name: "Croatia", dialCode: "+385", flag: "🇭🇷" },
    { code: "HU", name: "Hungary", dialCode: "+36", flag: "🇭🇺" },
    { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
    { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
    { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
    { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
    { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
    { code: "LT", name: "Lithuania", dialCode: "+370", flag: "🇱🇹" },
    { code: "LV", name: "Latvia", dialCode: "+371", flag: "🇱🇻" },
    { code: "MT", name: "Malta", dialCode: "+356", flag: "🇲🇹" },
    { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
    { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
    { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
    { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
    { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
    { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
    { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
    { code: "RO", name: "Romania", dialCode: "+40", flag: "🇷🇴" },
    { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
    { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
    { code: "SI", name: "Slovenia", dialCode: "+386", flag: "🇸🇮" },
    { code: "SK", name: "Slovakia", dialCode: "+421", flag: "🇸🇰" },
    { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
    { code: "UK", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
    { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
    { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  ];
  
  // Check if all required fields are filled
  useEffect(() => {
    const { fullName, email, companyWebsite, jobTitle, phoneNumber } = formData;
    setIsFormValid(
      fullName.trim() !== "" && 
      email.trim() !== "" && 
      companyWebsite.trim() !== "" && 
      jobTitle.trim() !== "" && 
      phoneNumber.trim() !== ""
    );
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    
    // Call the parent's onSubmit function with the form data
    onSubmit(formData);
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        fullName: "",
        email: "",
        companyWebsite: "",
        jobTitle: "",
        phoneNumber: "",
      });
      onClose();
    }, 1000);
  };

  const selectCountry = (flag: string) => {
    setSelectedFlag(flag);
  };

  const getDialCodeByFlag = (flag: string) => {
    const country = countries.find(c => c.flag === flag);
    return country ? country.dialCode : "+91"; // Default to India's code
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700">
              Full name<span className="text-purple-600">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              className="w-full border border-[#DAC8FF] rounded-md focus:border-[#DAC8FF] focus:outline-none focus:ring-0"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email<span className="text-purple-600">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="w-full border border-[#DAC8FF] rounded-md focus:border-[#DAC8FF] focus:ring focus:ring-[#DAC8FF] focus:ring-opacity-50"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyWebsite" className="text-gray-700">
              Company name/ website<span className="text-purple-600">*</span>
            </Label>
            <Input
              id="companyWebsite"
              name="companyWebsite"
              className="w-full border border-[#DAC8FF] rounded-md focus:border-[#DAC8FF] focus:ring focus:ring-[#DAC8FF] focus:ring-opacity-50"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-gray-700">
              Job title<span className="text-purple-600">*</span>
            </Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              className="w-full border border-[#DAC8FF] rounded-md focus:border-[#DAC8FF] focus:ring focus:ring-[#DAC8FF] focus:ring-opacity-50"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-gray-700">
              Phone number<span className="text-purple-600">*</span>
            </Label>
            <div className="flex border border-[#DAC8FF] rounded-md overflow-hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-2 bg-white border-r border-[#DAC8FF]">
                  <span className="mr-1 text-lg">{selectedFlag}</span>
                  <span className="text-xs text-gray-600 mr-1">{getDialCodeByFlag(selectedFlag)}</span>
                  <svg 
                    width="10" 
                    height="6" 
                    viewBox="0 0 10 6" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1"
                  >
                    <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="max-h-56 overflow-y-auto"
                  onWheel={(e) => {
                    e.stopPropagation();
                  }}
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  <div className="py-1 px-1">
                   
                    {countries.map((country) => (
                      <DropdownMenuItem 
                        key={country.code}
                        onClick={() => selectCountry(country.flag)}
                        className="cursor-pointer flex items-center gap-2 hover:bg-purple-50"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="text-gray-500 ml-1">{country.dialCode}</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                className="flex-1 border-none outline-none focus:ring-0 focus:outline-none"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <Button
            type="submit"
            className={`w-full py-3 rounded-md transition-colors ${
              isFormValid 
                ? "bg-[#DAC8FF] hover:bg-[#C8B8EE] text-[#6438C3]" 
                : "bg-[#DAC8FF] opacity-50 text-[#6438C3] cursor-not-allowed"
            }`}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Download"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main DownloadGuide Component
interface PdfDocument {
  id: string;
  type: string;
  title: string;
  link: string;
}

export const DownloadGuide = () => {
  const pathname = usePathname();
  const [pdfDocument, setPdfDocument] = useState<PdfDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Determine the document type based on the current path
  const getDocumentType = () => {
    if (pathname === "/") return "Home page";
    if (pathname.includes("/services/media-ott")) return "Media & OTT";
    if (pathname.includes("/services/food&beverages"))
      return "Food & Beverages";
    if (pathname.includes("/services/ecommerce&retail"))
      return "E-commerce & Retail";
    if (pathname.includes("/services/travel&hospitality"))
      return "Travel & Hospitality";
    if (pathname.includes("/services/edutech")) return "EduTech";
    if (pathname.includes("/services/banking&financial"))
      return "Banking & Financial Services";

    // Default to success-stories if no match
    return "Home page";
  };

  useEffect(() => {
    const fetchPdfDocument = async () => {
      setIsLoading(true);
      try {
        const documentType = getDocumentType();

        const q = query(
          collection(db, "pdfDocuments"),
          where("type", "==", documentType),
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setPdfDocument({
            id: doc.id,
            type: doc.data().type,
            title: doc.data().title,
            link: doc.data().link,
          });
        } else {
          // If no document found for the specific type, try to get any document
          const fallbackQuery = query(collection(db, "pdfDocuments"), limit(1));

          const fallbackSnapshot = await getDocs(fallbackQuery);

          if (!fallbackSnapshot.empty) {
            const doc = fallbackSnapshot.docs[0];
            setPdfDocument({
              id: doc.id,
              type: doc.data().type,
              title: doc.data().title,
              link: doc.data().link,
            });
          } else {
            setPdfDocument(null);
          }
        }
      } catch (error) {
        console.error("Error fetching PDF document:", error);
        setPdfDocument(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdfDocument();
  }, [pathname]);

  const handleFormSubmit = (formData: FormData) => {
    console.log("Form submitted:", formData);
    
    // Redirect to the PDF link after submission
    if (pdfDocument?.link) {
      window.open(pdfDocument.link, "_blank");
    }
  };

  if (isLoading || !pdfDocument) return null;

  return (
    // Removed the max-width constraint and used full width container
    <div className="relative w-full">
      <div className="p-4 md:p-10 md:py-12 bg-[#6438C3] text-white md:rounded-3xl font-semibold">
        <div className="grid md:grid-cols-5 gap-4">
          {/* Increased column span to use more horizontal space */}
          <div className="col-span-5 lg:col-span-4 grid gap-4 md:pl-6">
            <div className="text-lg md:text-[32px]">
            <div className="grid gap-4"><span> Read our latest step-by-step guide</span> 
             
             <span> to increasing {pdfDocument.title}</span></div>
            </div>
            <div className="mt-2">
              <button
                className="p-2 px-6 bg-white hover:bg-[#F1EAFF] text-[#6438c3] flex text-xl rounded-md"
                onClick={() => setIsDialogOpen(true)}>
                <span className="mx-2">Download</span>
                <span>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <mask
                      id="mask0_2_2000"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="25"
                      height="24">
                      <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_2_2000)">
                      <path
                        d="M12.5 15.575C12.3667 15.575 12.2417 15.5542 12.125 15.5125C12.0083 15.4708 11.9 15.4 11.8 15.3L8.2 11.7C8 11.5 7.90417 11.2667 7.9125 11C7.92083 10.7333 8.01667 10.5 8.2 10.3C8.4 10.1 8.6375 9.99583 8.9125 9.9875C9.1875 9.97917 9.425 10.075 9.625 10.275L11.5 12.15V5C11.5 4.71667 11.5958 4.47917 11.7875 4.2875C11.9792 4.09583 12.2167 4 12.5 4C12.7833 4 13.0208 4.09583 13.2125 4.2875C13.4042 4.47917 13.5 4.71667 13.5 5V12.15L15.375 10.275C15.575 10.075 15.8125 9.97917 16.0875 9.9875C16.3625 9.99583 16.6 10.1 16.8 10.3C16.9833 10.5 17.0792 10.7333 17.0875 11C17.0958 11.2667 17 11.5 16.8 11.7L13.2 15.3C13.1 15.4 12.9917 15.4708 12.875 15.5125C12.7583 15.5542 12.6333 15.575 12.5 15.575ZM6.5 20C5.95 20 5.47917 19.8042 5.0875 19.4125C4.69583 19.0208 4.5 18.55 4.5 18V16C4.5 15.7167 4.59583 15.4792 4.7875 15.2875C4.97917 15.0958 5.21667 15 5.5 15C5.78333 15 6.02083 15.0958 6.2125 15.2875C6.40417 15.4792 6.5 15.7167 6.5 16V18H18.5V16C18.5 15.7167 18.5958 15.4792 18.7875 15.2875C18.9792 15.0958 19.2167 15 19.5 15C19.7833 15 20.0208 15.0958 20.2125 15.2875C20.4042 15.4792 20.5 15.7167 20.5 16V18C20.5 18.55 20.3042 19.0208 19.9125 19.4125C19.5208 19.8042 19.05 20 18.5 20H6.5Z"
                        fill="#6438C3"
                      />
                    </g>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute right-14 -bottom-1">
        <Image src="/icons/docs.svg" alt="guide" width={200} height={200} />
      </div>

      {/* Download Form Component */}
      <DownloadForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleFormSubmit}
        documentTitle={pdfDocument.title}
      />
    </div>
  );
};