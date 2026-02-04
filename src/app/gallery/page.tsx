import GalleryCard from "@/components/GalleryCard";
import { getListPage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";
import type { GalleryPage as GalleryPageType } from "@/types";

export default function GalleryPage() {
  const galleryIndex =
    getListPage<GalleryPageType["frontmatter"]>("gallery/_index.md");

  return (
    <>
      <SeoMeta {...galleryIndex.frontmatter} />
      <section className="section">
        <div className="container">
          <div className="grid grid-flow-row lg:grid-cols-4 md:grid-cols-2 gap-x-[50px]">
            {galleryIndex.frontmatter.gallery_images?.map((item, i) => (
              <GalleryCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
