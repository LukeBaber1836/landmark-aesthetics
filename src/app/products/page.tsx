import ImageFallback from "@/helpers/ImageFallback";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import FAQs from "@/partials/FAQs";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Faqs, ServicePage } from "@/types";
import Button from "@/components/Button";

const ProductsPage = () => {
  const productsIndex =
    getListPage<ServicePage["frontmatter"]>("products/_index.md");
  const products = getSinglePage<ServicePage["frontmatter"]>("products");
  const faqsData = getListPage<Faqs["frontmatter"]>("faqs/_index.md");

  return (
    <>
      <SeoMeta {...productsIndex.frontmatter} />
      <PageHeader title={productsIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          {products.map((product, i) => (
            <div
              className={`row g-5 mb-32 last:mb-0 items-center justify-between flex flex-col md:flex-row ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
              key={product.slug}
            >
              <div
                data-aos={i % 2 === 0 ? "fade-right-sm" : "fade-left-sm"}
                data-aos-delay="300"
                className="col-10 lg:col-5 mx-auto"
              >
                <ImageFallback
                  src={product.frontmatter.image!}
                  alt={product.frontmatter.title}
                  width={600}
                  height={800}
                  className="rounded-lg"
                />
              </div>

              <div className="col-10 lg:col-5 mx-auto">
                <h2
                  data-aos="fade-up-sm"
                  data-aos-delay="150"
                  className="h4 pb-24"
                  dangerouslySetInnerHTML={markdownify(
                    product.frontmatter.title
                  )}
                />

                {product.frontmatter.features?.map((feature, j) => (
                  <div
                    data-aos="fade-up-sm"
                    data-aos-delay={j * 100 + 200}
                    className="mb-8 last:mb-0"
                    key={j}
                  >
                    <h3 className="h6 text-primary/75 pb-3">
                      <span className="mr-4 text-primary/25">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      {feature.name}
                    </h3>

                    <p
                      className="text-balance"
                      dangerouslySetInnerHTML={markdownify(
                        feature.description || ""
                      )}
                    />
                  </div>
                ))}

                <Button label="Learn More" link={product.frontmatter.link} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <CallToAction isNoSectionTop />
      <FAQs isNoSectionTop faqsData={faqsData} />
    </>
  );
};

export default ProductsPage;
