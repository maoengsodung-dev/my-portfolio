import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-8 h-6 w-40 rounded-full" />
        <Skeleton className="mt-6 h-14 w-3/4" />
        <Skeleton className="mt-4 h-6 w-1/2" />
        <Skeleton className="mt-12 aspect-[16/9] w-full rounded-3xl" />
      </div>
    </div>
  );
}
