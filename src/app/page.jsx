
import Hero from "@/homesection/Hero";
import ShopByCategory from "@/homesection/Categories";
import NewArrivals from "@/homesection/Newarrival";
import Newsletter from "@/homesection/Newsletter";
export default function Home() {
  return (
    <main>
      <Hero />
     <ShopByCategory />
       <NewArrivals />
       <Newsletter />
    </main>
  );
}