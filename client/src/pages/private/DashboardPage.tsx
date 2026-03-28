import { CardContent, CardTitle } from '@/components/ui/card';
import TotalCard from '@/components/dashboard/TotalCard';

const DashboardPage = () => {
  return (
    <CardContent className="w-full space-y-6">
      <CardTitle className="text-2xl text-center">Dashboard</CardTitle>

      {/* Temporary Placeholders */}
      <section className="w-full flex items-center justify-center gap-6">
        <TotalCard title="Total Documents" />
        <TotalCard title="Total Quizzes" />
      </section>
    </CardContent>
  );
};

export default DashboardPage;
