import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import type { ServicePost } from "@/types";
import Link from "next/link";

interface Props {
  service: ServicePost;
  index: number;
  className?: string;
}

export default function ServiceCard({ service, index, className }: Props) {
  const { title, image, description } = service.frontmatter;
  return (
    <div
      data-aos="fade-up-sm"
      data-aos-delay={index * 100 + 150}
      className={`${className ? className : "col-11 sm:col-9 md:col-6 lg:col-4"} mb-12 last:mb-0 mx-auto relative group`}
    >
      <div className="overflow-hidden rounded-3xl shadow-lg shadow-black/20">
        <ImageFallback
          src={image!}
          alt={title}
          width={450}
          height={600}
          className="object-cover aspect-9/12 w-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>

      <Link
        className="before:absolute before:inset-0"
        href={`/services/${service.slug}`}
      >
        <h2
          className="h5 my-6"
          dangerouslySetInnerHTML={markdownify(title || "")}
        />
      </Link>
      <p
        className="text-base text-body-color mb-7 line-clamp-3"
        dangerouslySetInnerHTML={markdownify(description || "")}
      />
    </div>
  );
}
