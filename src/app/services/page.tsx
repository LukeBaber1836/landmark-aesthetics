import ServiceCard from "@/components/ServiceCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import CallToAction from "@/partials/CallToAction";
import FAQs from "@/partials/FAQs";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ServicePost, Faqs } from "@/types";

const SERVICES_FOLDER = "services";

const ServicesIndexPage = () => {
  const faqsData = getListPage<Faqs["frontmatter"]>("faqs/_index.md");
  const services = getSinglePage<ServicePost["frontmatter"]>(SERVICES_FOLDER);
  const servicesIndex = getListPage<ServicePost["frontmatter"]>(
    `${SERVICES_FOLDER}/_index.md`
  );
  const sortedServices = sortByDate(services);

  return (
    <>
      <SeoMeta {...servicesIndex.frontmatter} />
      <PageHeader title={servicesIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row">
            {sortedServices.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CallToAction isNoSectionTop />
      <FAQs isNoSectionTop faqsData={faqsData} />
    </>
  );
};

export default ServicesIndexPage;
