import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-8 h-6 w-24 rounded-full" />
        <Skeleton className="mt-4 h-12 w-full" />
        <Skeleton className="mt-4 h-4 w-40" />
        <Skeleton className="mt-10 aspect-[16/8] w-full rounded-3xl" />
      </div>
    </div>
  );
}
