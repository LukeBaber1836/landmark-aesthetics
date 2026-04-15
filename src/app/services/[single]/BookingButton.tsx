"use client";

import Button from "@/components/Button";
import posthog from "posthog-js";

interface BookingButtonProps {
  link: string;
  serviceSlug: string;
  serviceTitle: string;
}

export default function BookingButton({
  link,
  serviceSlug,
  serviceTitle,
}: BookingButtonProps) {
  const handleClick = () => {
    posthog.capture("service_booking_clicked", {
      service_slug: serviceSlug,
      service_title: serviceTitle,
      booking_link: link,
    });
  };

  return (
    <span onClick={handleClick}>
      <Button enable={true} label="Book your appointment today!" link={link} />
    </span>
  );
}
