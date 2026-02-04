import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import type { ContactPage as ContactPageType } from "@/types";
import Link from "next/link";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  const contact =
    getListPage<ContactPageType["frontmatter"]>("contact/_index.md");
  const { title, description, meta_title, image, address_section } =
    contact.frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} isContactPage />
      <section className="-mt-[45%] sm:-mt-[30%] md:-mt-[25%] lg:-mt-[35%] xl:-mt-[30%] 2xl:-mt-[23%]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-20 justify-center lg:justify-between">
            <div className="lg:w-[52%]">
              <ContactForm
                title={title}
                description={description}
                action={contact_form_action}
              />
            </div>

            <div className="lg:w-[55%] self-center lg:self-end pb-14">
              <h3
                data-aos="fade-up-sm"
                data-aos-delay="150"
                className="h4 mb-4"
                dangerouslySetInnerHTML={markdownify(address_section.title)}
              />
              <p
                data-aos="fade-up-sm"
                data-aos-delay="200"
                className="text-balance"
                dangerouslySetInnerHTML={markdownify(
                  address_section.description,
                )}
              />

              <ul className="grid xl:grid-cols-2 lg:grid-cols-1  md:grid-cols-2 gap-8 mt-12">
                <li data-aos="fade-up-sm w-fit" data-aos-delay="250">
                  <h4 className="h6 mb-3">Working Mail</h4>
                  <Link href={`mailto:${config.params.email}`}>
                    {config.params.email}
                  </Link>
                </li>
                <li data-aos="fade-up-sm" data-aos-delay="300">
                  <h4 className="h6 mb-3">Office Phone</h4>
                  <Link href={`tel:${config.params.phone}`}>
                    {config.params.phone}
                  </Link>
                </li>
                <li data-aos="fade-up-sm" data-aos-delay="350">
                  <h4 className="h6 mb-3">Office Address</h4>
                  <Link
                    target="_blank"
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      config.params.address,
                    )}`}
                    dangerouslySetInnerHTML={markdownify(config.params.address)}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <CallToAction isNoSectionTop isNoSectionBottom /> */}
    </>
  );
};

export default ContactPage;
