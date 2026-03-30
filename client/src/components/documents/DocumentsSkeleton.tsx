import { Skeleton } from '../ui/skeleton';

const DocumentsSkeleton = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <Skeleton className="w-full lg:max-w-xs sm:max-w-3xs h-42" key={i} />
  ));
};

export default DocumentsSkeleton;
