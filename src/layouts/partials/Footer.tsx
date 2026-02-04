import Button from "@/components/Button";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

export default function Footer() {
  const { footer_title, address, phone, email, footer_content } = config.params;
  return (
    <footer className="section pb-0 bg-primary">
      <div className="container mx-auto">
        <div className="row max-md:justify-center">
          <div className="md:col-6 lg:col-5 max-md:text-center">
            <h2
              data-aos="fade-up-sm"
              data-aos-delay="150"
              className="font-medium text-white mb-8"
              dangerouslySetInnerHTML={markdownify(footer_title)}
            />
            <div data-aos="fade-up-sm" data-aos-delay="200">
              <Button
                enable={config.footer_button.enable}
                label={config.footer_button.label}
                link={config.footer_button.link}
                style="btn-outline"
              />
            </div>
          </div>
          <div className="md:col-6 lg:col-7 ml-auto max-md:mt-14">
            <div className="mb-10 lg:mb-8">
              <div className="row max-lg:gy-4 justify-center max-md:text-center lg:justify-end space-x-10">
                {menu.footer.map((menu, i) => (
                  <div
                    data-aos="fade-up-sm"
                    data-aos-delay={i * 100 + 200}
                    className="flex flex-col items-center col-4 md:col-6 lg:col-3 pr-0 w-fit"
                    key={i}
                  >
                    <h5 className="mb-7 font-normal text-base lg:mb-6 text-text-light/50">
                      {menu.title}
                    </h5>
                    <ul className="flex flex-col flex-nowrap items-center w-fit text-center">
                      {menu.children.map((child) => (
                        <li
                          className="mb-4 text-text-light text-base hover:text-secondary text-lg!"
                          key={child.url}
                        >
                          <Link href={child.url}>{child.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div
                  data-aos="fade-up-sm"
                  data-aos-delay={menu.footer.length * 100 + 200}
                  className="flex flex-col items-center col-4 md:col-6 lg:col-3 pr-0 w-fit"
                >
                  <h5 className="mb-7 font-normal text-base lg:mb-6 text-text-light/50">
                    Socials
                  </h5>
                  <ul className="flex flex-col items-center">
                    {social.main.map((item, index) => (
                      <li
                        key={index}
                        className="mb-4 text-text-light text-base hover:text-secondary text-lg!"
                      >
                        <Link href={item.link} target="_blank">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row xl:w-[1462px] lg:w-[1224px]">
          <div className="md:col-10">
            <div className="row md:justify-between justify-center mx-auto md:mt-10 mb-10">
              <div
                data-aos="fade-up-sam"
                data-aos-delay="300"
                className="col-10 md:col-6 max-w-[400px]"
              >
                <ImageFallback
                  src={config.site.logo_footer}
                  width={215}
                  height={52}
                  alt="footer logo"
                  className="mb-3 max-md:mx-auto sm:translate-x-0 translate-x-4"
                  loading="lazy"
                />
                <p
                  className="text-text-light/50 text-balance max-md:text-center"
                  dangerouslySetInnerHTML={markdownify(footer_content)}
                />
              </div>
              <div
                data-aos="fade-up-sm"
                data-aos-delay="350"
                className="col-10 md:col-6 lg:col-3 max-md:right w-full"
              >
                <ul className="flex flex-col items-center md:items-end mt-8 md:mt-0">
                  <li className="my-4 text-text-light text-base hover:text-secondary text-lg!">
                    <Link href={`tel:${phone}`}>{phone}</Link>
                  </li>
                  <li className="mb-4 text-text-light text-base hover:text-secondary text-lg!">
                    <Link href={`mailto:${email}`}>{email}</Link>
                  </li>
                  <li className="mb-4 text-text-light text-base hover:text-secondary text-lg!">
                    <Link
                      target="_blank"
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        address,
                      )}`}
                      dangerouslySetInnerHTML={markdownify(address)}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-text-light/20 py-8 mt-10 text-center">
          <p className="text-text-light/70 text-sm">
            Website by{" "}
            <Link
              href="https://www.lukebaber.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white"
            >
              Luke Baber
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
