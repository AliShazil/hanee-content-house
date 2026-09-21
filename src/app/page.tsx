import { BookCTA } from "@/components/BookCTA";
import { CreateSomething } from "@/components/CreateSomething";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { OurProcess } from "@/components/OurProcess";
import { PlatformConnectHero } from "@/components/PlatformConnectHero";
import { RecentWork } from "@/components/RecentWork";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <RecentWork />
      <WhyChooseUs />
      <PlatformConnectHero />
      <OurProcess />
      <FAQ />
      <BookCTA />
      <CreateSomething />
    </div>
  );
}
