import ServiceCard from "@/components/ServiceCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import CallToAction from "@/partials/CallToAction";
import FAQs from "@/partials/FAQs";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ServicePost, Faqs } from "@/types";
import { notFound } from "next/navigation";

const SERVICES_FOLDER = "services";

export async function generateStaticParams() {
  const services = getSinglePage<ServicePost["frontmatter"]>(SERVICES_FOLDER);
  const totalPages = Math.ceil(services.length / config.settings.pagination);
  const paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }
  return paths;
}

const ServicesPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const faqsData = getListPage<Faqs["frontmatter"]>("faqs/_index.md");
  const servicesIndex = getListPage<ServicePost["frontmatter"]>(
    `${SERVICES_FOLDER}/_index.md`
  );
  const services = getSinglePage<ServicePost["frontmatter"]>(SERVICES_FOLDER);
  const sortedServices = sortByDate(services);
  const totalPages = Math.ceil(services.length / config.settings.pagination);
  const currentPage = slug && !isNaN(Number(slug)) ? Number(slug) : 1;
  const indexOfLastService = currentPage * config.settings.pagination;
  const indexOfFirstService = indexOfLastService - config.settings.pagination;
  const currentServices = sortedServices.slice(
    indexOfFirstService,
    indexOfLastService
  );

  if (!servicesIndex) return notFound();

  return (
    <>
      <SeoMeta {...servicesIndex.frontmatter} />
      <PageHeader title={servicesIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row">
            {currentServices.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
            <Pagination
              section={SERVICES_FOLDER}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </section>

      <CallToAction isNoSectionTop />
      <FAQs isNoSectionTop faqsData={faqsData} />
    </>
  );
};

export default ServicesPage;
