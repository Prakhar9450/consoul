"use client"
import Footer from "../components/Footer";
import BlogListing from "../pages/List";

export default function Page () {
    return <div>
    <div className="border-b">
    <div className="mx-80 ">
        <BlogListing />
    </div>
    </div>
    <div>
        <Footer />
    </div>
    </div>
}