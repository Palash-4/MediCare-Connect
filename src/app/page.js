import FeaturedDoctors from "@/components/home/FeaturedDoctors";
import Hero from "@/components/home/Hero";
import Specializations from "@/components/home/Specializations";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";



export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturedDoctors></FeaturedDoctors>
      <Specializations></Specializations>
      <Statistics></Statistics>
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
