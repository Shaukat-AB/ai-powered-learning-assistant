import { Skeleton } from '../ui/skeleton';

const DocumentsSkeleton = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <Skeleton className="w-full document-card-w h-42" key={i} />
  ));
};

export default DocumentsSkeleton;
