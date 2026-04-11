import { Skeleton } from '../ui/skeleton';

const TotalSkeleton = () => {
  return Array.from({ length: 2 }).map((_, i) => (
    <Skeleton className="w-full document-card-w h-22" key={i} />
  ));
};

export default TotalSkeleton;
