import FeaturedDoctors from "@/components/home/FeaturedDoctors";
import Hero from "@/components/home/Hero";
import Specializations from "@/components/home/Specializations";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";



export default function Home() {

   const stats = {
    totalDoctors: 120,
    totalPatients: 2500,
    totalAppointments: 5000,
    totalReviews: 1800,
  };
  return (
    <div>
      <Hero></Hero>
      <FeaturedDoctors></FeaturedDoctors>
      <Specializations></Specializations>
       <Statistics stats={stats} />
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
