"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SwipeButton from "./ui/SwipeButton";

interface PdfDocument {
  id: string;
  type: string;
  title: string;
  link: string;
}

interface DownloadFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  designation: string;
  companyWebsite: string;
}

export const DownloadGuide = () => {
  const pathname = usePathname();
  const [pdfDocument, setPdfDocument] = useState<PdfDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<DownloadFormData>({
    fullName: "",
    email: "",
    contactNumber: "",
    designation: "",
    companyWebsite: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);

      // Redirect to the PDF link
      if (pdfDocument?.link) {
        window.open(pdfDocument.link, "_blank");
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        designation: "",
        companyWebsite: "",
      });
    }, 1000);
  };

  if (isLoading || !pdfDocument) return null;

  return (
    <div className="relative md:max-w-4xl  ">
      <div className=" p-6 md:p-12 bg-[#6438C3] text-white md:rounded-3xl font-semibold">
        <div className="grid md:grid-cols-6 gap-5">
          <div className="col-span-4 grid gap-5 ">
            <div className="text-lg md:text-[27px] md:whitespace-nowrap">
              Read our latest step-by-step guide
              <br />
              to increasing {pdfDocument.title}
            </div>
            <div>
              <button
                className="p-2 px-5 bg-white hover:bg-[#F1EAFF] text-[#6438c3] flex text-xl rounded-xl"
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
      <div className="hidden md:block absolute right-14 bottom-0">
        <Image src="/icons/docs.svg" alt="guide" width={200} height={200} />
      </div>

      {/* Download Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download {pdfDocument.title}</DialogTitle>
            <DialogDescription>
              Please fill in your details to download the guide
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company website/ URL</Label>
              <Input
                id="companyWebsite"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#6438C3] hover:bg-[#5429B3]"
              disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Download"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
