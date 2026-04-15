import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import type { CTASection } from "@/types";
import CTAButtons from "./CTAButtons";

const CallToAction = ({
  isNoSectionTop = false,
  isNoSectionBottom = false,
}: {
  isNoSectionTop?: boolean;
  isNoSectionBottom?: boolean;
}) => {
  const callToActionData = getListPage<CTASection>(
    "sections/call-to-action.md",
  );

  return (
    <>
      {callToActionData.frontmatter.enable && (
        <section
          className={`section ${isNoSectionTop && "pt-0"} ${
            isNoSectionBottom && "pb-0"
          }`}
        >
          <div className="bg-[url(/images/call-to-action.png)] bg-cover bg-center section md:h-[600px] lg:h-[890px]">
            <div className="container">
              <div className="flex flex-col lg:flex-row max-lg:items-center max-lg:text-center lg:justify-between gap-6 lg:gap-14">
                <h2
                  data-aos="fade-up-sm"
                  data-aos-delay="150"
                  className="h1 text-white flex-1 text-shadow-lg"
                  dangerouslySetInnerHTML={markdownify(
                    callToActionData.frontmatter.title,
                  )}
                />
                <div className="flex-1">
                  <p
                    data-aos="fade-up-sm"
                    data-aos-delay="250"
                    className="mt-4 text-white text-balance text-lg text-shadow-lg"
                    dangerouslySetInnerHTML={markdownify(
                      callToActionData.frontmatter.description,
                    )}
                  />
                  <CTAButtons
                    buttonSolid={callToActionData.frontmatter.button_solid}
                    buttonOutline={callToActionData.frontmatter.button_outline}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default CallToAction;
