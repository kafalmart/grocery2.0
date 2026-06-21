import Hero from "@/components/home/hero/page";
import Categories from "@/components/home/category/page";
import FeaturedProducts from "@/components/home/featuredproduct/page";
import HowItWorks from "@/components/home/howitwork/page";
import Reviews from "@/components/home/reviews/page";
import Contact from "@/components/home/contact/page";
import DiscountBanner from "@/components/home/banner/page";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <Hero />

      {/* Categories */}
      <Categories />
      
      {/* Popular Products */}
      <FeaturedProducts />

      {/* Discount Banners */}
    <DiscountBanner/>

      {/* How It Works */}
      <HowItWorks />

      {/* Reviews */}
      <Reviews />

      {/* Contact */}
      <Contact />
    </main>
  );
}