import { Library, FileText } from 'lucide-react';

import { CardContent, CardTitle } from '@/components/ui/card';
import TotalCard from '@/components/dashboard/TotalCard';
import TotalSkeleton from '@/components/dashboard/TotalSkeleton';

import { useGetDashboardData } from '@/hooks/dashboard';

const DashboardPage = () => {
  const { data, isLoading } = useGetDashboardData();

  return (
    <CardContent className="w-full space-y-6">
      <CardTitle className="text-2xl text-center mb-12">Dashboard</CardTitle>

      <section className="w-full flex flex-wrap items-center justify-center gap-6">
        {!isLoading ? (
          <>
            <TotalCard
              title="Uploaded Documents"
              count={data?.totalDocuments || 0}
              iconProps={{ Component: Library, className: 'text-blue-500!' }}
            />
            <TotalCard
              title="Generated Quizzes"
              count={data?.totalQuizzes || 0}
              iconProps={{ Component: FileText, className: 'text-green-500!' }}
            />
          </>
        ) : (
          <TotalSkeleton />
        )}
      </section>
    </CardContent>
  );
};

export default DashboardPage;
