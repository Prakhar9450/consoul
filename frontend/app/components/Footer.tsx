"use client";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex justify-center w-full my-10">
      <footer className=" md:py-12 ">
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 border-b pb-8">
          <div className="space-y-4">
            <Image
              src="/logos/logo.svg"
              alt="Consoul Logo"
              width={145}
              height={50}
              className="h-auto"
            />
            <p className="text-muted-foreground">
              We optimise your marketing efforts, backing them with real-time
              data & technology
            </p>
          </div>

          {/* Product Links */}
          <div className="grid grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#555555]">Product</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#6438C3]">
                  {" "}
                  Services
                </Link>
                <Link
                  href="/success-stories"
                  className="text-muted-foreground hover:text-[#6438C3]">
                  Success Stories
                </Link>
              </nav>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#555555]">Company</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-[#6438C3]">
                  About us
                </Link>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-[#6438C3]">
                  Contact us
                </Link>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-[#6438C3]">
                  Careers
                </Link>
                <Link
                  href="/blogs"
                  className="text-muted-foreground hover:text-[#6438C3]">
                  Blogs
                </Link>
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-[#6438C3]">
                  Admin
                </Link>
              </nav>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#555555]">Contacts us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-[#6438C3]" />
                <span>+90 9167459889</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-[#6438C3]" />
                <span>hello@consoulsolution.com</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-[#6438C3]" />
                <span>
                  Anmol B, 1304, Govindji Shroff Marg, Mahesh Nagar, Goregaon
                  West, Mumbai, Maharashtra 400104
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container my-4 flex flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left text-md">
          <p className="text-muted-foreground">
            Copyright © 2024 Lorem Ipsum Templates
          </p>
          <Link href="/privacy" className="text-muted-foreground ">
            All Rights Reserved |{" "}
            <span className="underline text-[#6438C3]">Privacy Policy</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
