"use client";

import { useSearchParams } from "next/navigation";
import { BookingForm } from "./booking-form";

export function BookingWithPrefill() {
  const searchParams = useSearchParams();

  return (
    <BookingForm
      defaultServiceId={searchParams.get("service") ?? ""}
      defaultPackageId={searchParams.get("package") ?? ""}
    />
  );
}
