import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import similarItems from "@/lib/utils/similarItems";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import type { ServicePost } from "@/types";
import { format } from "date-fns";
import { notFound } from "next/navigation";

const services_folder = "services";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const services = getSinglePage<ServicePost["frontmatter"]>(services_folder);

  const paths = services.map((service) => ({
    single: service.slug!,
  }));

  return paths;
};

const ServicePage = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const services = getSinglePage<ServicePost["frontmatter"]>("services");
  const service = services.find((s) => s.slug === params.single);

  if (!service) return notFound();

  // Get 2 random services excluding the current one
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const shuffled = otherServices.sort(() => 0.5 - Math.random());
  const randomServices = shuffled.slice(0, 2);

  return (
    <>
      <SeoMeta {...service.frontmatter} />
      <section>
        <div className="bg-primary row justify-center text-center">
          <div
            data-aos="zoom-in-sm"
            data-aos-delay="200"
            className="col-10 xl:col-7 pt-[16.25rem] pb-[10rem] text-white"
          >
            <h1
              className="text-center pt-3.5 text-white"
              dangerouslySetInnerHTML={markdownify(service.frontmatter.title)}
            />
          </div>
        </div>
        <div className="container section-sm pb-0">
          <div className="row justify-center">
            <article className="col-11 mx-auto lg:col-10 border-b border-border/20">
              {service.frontmatter.image && (
                <div className="pb-10">
                  <ImageFallback
                    src={service.frontmatter.image_wide}
                    height={600}
                    width={900}
                    alt={service.frontmatter.title}
                    className="w-[calc[100%-30px]] mx-auto object-cover aspect-video rounded-3xl shadow-lg"
                  />
                </div>
              )}
              <div className="content mb-10">
                <MDXContent content={service.content} />
              </div>
              {service.frontmatter.pricing && (
                <div className="mx-10 text-center my-16 py-8 px-6rounded-3xl border border-border/20 rounded-2xl inset-shadow-sm">
                  <h3 className="text-h4 font-medium text-primary mb-2">
                    Pricing
                  </h3>
                  <p className="text-2xl font-medium text-text">
                    {service.frontmatter.pricing}
                  </p>
                </div>
              )}
              <div className="flex justify-center mt-16 mb-10">
                <Button
                  enable={true}
                  label="Book your appointment today!"
                  link={service.frontmatter.booking_link || "#"}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section pb-0">
        <div className="container">
          <div className="row justify-between">
            <div className="lg:col-3 max-lg:text-center">
              <p
                data-aos="fade-up-sm"
                data-aos-delay="150"
                className="font-medium text-primary uppercase"
                dangerouslySetInnerHTML={markdownify("SERVICES")}
              />
              <h2
                data-aos="fade-up-sm"
                data-aos-delay="200"
                className="my-3 font-medium text-primary"
                dangerouslySetInnerHTML={markdownify("Other Services")}
              />
              <div data-aos="fade-up-sm" data-aos-delay="300">
                <Button enable label="View All" link="/services" />
              </div>
            </div>
            <div className="lg:col-8 max-lg:mt-14">
              <div className="row">
                {randomServices.map((service, i) => (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    index={i}
                    className="md:col-6"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
