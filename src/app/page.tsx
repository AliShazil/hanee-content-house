import { BookCTA } from "@/components/BookCTA";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { OurProcess } from "@/components/OurProcess";
import { PlatformConnectHero } from "@/components/PlatformConnectHero";
import { RecentWork } from "@/components/RecentWork";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { getContent } from "@/lib/content";

// Rendered statically; admin saves call revalidatePath("/") to rebuild it.
export const dynamic = "force-static";

export default async function Home() {
  const { reels, testimonials } = await getContent();

  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <RecentWork reels={reels} />
      <WhyChooseUs />
      <PlatformConnectHero />
      <OurProcess />
      <Testimonials testimonials={testimonials} />
      <FAQ />
      <BookCTA />
      <Footer />
    </div>
  );
}
