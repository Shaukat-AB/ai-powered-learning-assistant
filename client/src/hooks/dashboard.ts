import { toast } from 'sonner';

import { getDashboradData } from '@/services/dashboard/dashboard';
import { useQuery } from '@tanstack/react-query';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  data: () => [...dashboardKeys.all, 'dashboard-data'],
};

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: dashboardKeys.data(),

    queryFn: async () => {
      try {
        const data = await getDashboradData();

        if (data?.message && !data?.success) {
          toast.error(data.message);
        }

        return data as { totalDocuments: number; totalQuizzes: number };
      } catch (error) {
        toast.error('Failed to get dashboard data');
        console.error('Failed to get dashboard data: ', error);
      }
      return null;
    },
  });
};
