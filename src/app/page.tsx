import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import FAQs from "@/partials/FAQs";
import GallerySlider from "@/partials/GallerySlider";
import HeroBanner from "@/partials/HeroBanner";
import HomeServicesSection from "@/partials/HomeServicesSection";
import SeoMeta from "@/partials/SeoMeta";
import Testimonial from "@/partials/Testimonial";
import type { Faqs, Homepage, ReviewPage } from "@/types";

export default function Home() {
  const homepage = getListPage("homepage/_index.md") as Homepage;
  const { banner, gallery, services } = homepage.frontmatter;

  const testimonial =
    getListPage<ReviewPage["frontmatter"]>("reviews/_index.md");
  const faqsData = getListPage<Faqs["frontmatter"]>("faqs/_index.md");

  return (
    <>
      <SeoMeta />
      <HeroBanner banner={banner} />
      <GallerySlider gallery={gallery} />
      <HomeServicesSection services={services} />
      {/* <FunFacts funFacts={fun_facts} isNoSectionTop /> */}
      <Testimonial isNoSectionTop testimonial={testimonial} />
      {/* <HomeServicesFactsSection services_facts={services_facts} /> */}
      {/* <HomeProjectsSection projects={projects} /> */}
      <FAQs isNoSectionTop faqsData={faqsData} />
      <CallToAction isNoSectionBottom />
    </>
  );
}
