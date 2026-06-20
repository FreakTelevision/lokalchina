"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/shared/pagination";

interface RoutesPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function RoutesPagination({
  currentPage,
  totalPages,
}: RoutesPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
