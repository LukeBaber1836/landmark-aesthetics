"use client";

import Button from "@/components/Button";
import posthog from "posthog-js";

interface CTAButtonConfig {
  enable: boolean;
  label: string;
  link: string;
  style?: string;
}

interface CTAButtonsProps {
  buttonSolid: CTAButtonConfig;
  buttonOutline: CTAButtonConfig;
}

export default function CTAButtons({
  buttonSolid,
  buttonOutline,
}: CTAButtonsProps) {
  return (
    <div className="flex flex-wrap gap-5 pt-8 max-lg:justify-center">
      <div data-aos="zoom-in-sm" data-aos-delay="250">
        <span
          onClick={() =>
            posthog.capture("cta_button_clicked", {
              label: buttonSolid.label,
              link: buttonSolid.link,
              button_type: "solid",
            })
          }
        >
          <Button {...buttonSolid} />
        </span>
      </div>
      <div data-aos="zoom-in-sm" data-aos-delay="350">
        <span
          onClick={() =>
            posthog.capture("cta_button_clicked", {
              label: buttonOutline.label,
              link: buttonOutline.link,
              button_type: "outline",
            })
          }
        >
          <Button {...buttonOutline} style="btn-primary text-primary bg-body" />
        </span>
      </div>
    </div>
  );
}
