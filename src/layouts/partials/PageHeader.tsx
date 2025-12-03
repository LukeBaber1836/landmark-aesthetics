import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({
  title = "",
  isContactPage = false,
}: {
  title?: string;
  isContactPage?: boolean;
}) => {
  return (
    <section>
      <div className="text-center">
        <div
          className={`${isContactPage ? "h-[400px] lg:h-[650px]" : "pt-[240px] pb-[140px]"} bg-[url(/images/page-header.png)] bg-cover bg-bottom bg-no-repeat`}
        >
          {!isContactPage && (
            <>
              <h1
                data-aos="zoom-out-sm"
                data-aos-delay="150"
                className="text-white"
              >
                {humanize(title)}
              </h1>
              <Breadcrumbs className="mt-3" />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
