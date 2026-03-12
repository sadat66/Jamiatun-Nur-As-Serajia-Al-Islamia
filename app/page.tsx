import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickLinks from "@/components/QuickLinks";
import NewsNotice from "@/components/NewsNotice";
import GallerySection from "@/components/GallerySection";
import VideoGallery from "@/components/VideoGallery";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <HeroSection />
        <QuickLinks />
        <NewsNotice />
        <GallerySection />
        <VideoGallery />
      </main>
      <Footer />
      <FloatingSocial />
    </>
  );
}
