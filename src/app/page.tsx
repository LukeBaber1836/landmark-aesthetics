import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import FAQs from "@/partials/FAQs";
import FunFacts from "@/partials/FunFacts";
import GallerySlider from "@/partials/GallerySlider";
import HeroBanner from "@/partials/HeroBanner";
import HomeProjectsSection from "@/partials/HomeProjectsSection";
import HomeServicesFactsSection from "@/partials/HomeServicesFactsSection";
import HomeServicesSection from "@/partials/HomeServicesSection";
import SeoMeta from "@/partials/SeoMeta";
import Testimonial from "@/partials/Testimonial";
import type { Faqs, Homepage, ReviewPage } from "@/types";

export default function Home() {
  const homepage = getListPage("homepage/_index.md") as Homepage;
  const { banner, gallery, fun_facts, services, services_facts, projects } =
    homepage.frontmatter;

  const testimonial =
    getListPage<ReviewPage["frontmatter"]>("reviews/_index.md");
  const faqsData = getListPage<Faqs["frontmatter"]>("faqs/_index.md");

  return (
    <>
      <SeoMeta />
      <HeroBanner banner={banner} />
      <GallerySlider gallery={gallery} />
      <FunFacts funFacts={fun_facts} isNoSectionTop />
      <Testimonial isNoSectionTop testimonial={testimonial} />
      <HomeServicesSection services={services} />
      <HomeServicesFactsSection services_facts={services_facts} />
      <HomeProjectsSection projects={projects} />
      <CallToAction isNoSectionTop />
      <FAQs isNoSectionTop faqsData={faqsData} />
    </>
  );
}
