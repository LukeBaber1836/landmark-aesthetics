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
    `${SERVICES_FOLDER}/_index.md`,
  );
  const sortedServices = sortByDate(services);

  return (
    <>
      <SeoMeta {...servicesIndex.frontmatter} />
      <PageHeader title={servicesIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedServices.map((service, i) => (
              <ServiceCard
                className="col-span-1"
                key={service.slug}
                service={service}
                index={i}
              />
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
