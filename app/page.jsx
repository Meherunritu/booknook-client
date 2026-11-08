import Banner from "@/components/Banner";
import NewArrivals from "@/components/NewArrivals";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";

export const metadata = { title: "Home" };

export default function HomePage() {
  return (
    <>
      <Banner />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </>
  );
}
